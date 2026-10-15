"""FalkorDB Repository Layer for parameterized graph operations."""

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from .connection import FalkorDBConnection, get_falkordb_driver
from .queries import CypherQueries
from ..core.logging import logger
from ..models.memory import MemoryResponse, MemoryType
from ..models.graph import GraphNode, GraphEdge, GraphDataResponse


class FalkorDBRepository:
    """Encapsulates all graph reads and writes using parameterized Cypher."""

    def __init__(self, connection: Optional[FalkorDBConnection] = None):
        self.conn = connection or get_falkordb_driver()
        # In-memory graph state for development fallback / unit testing when DB is offline
        self._in_memory_nodes: Dict[str, Dict[str, Any]] = {}
        self._in_memory_edges: List[Dict[str, Any]] = []

    def _now(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def initialize_schema(self) -> bool:
        """Run Cypher index and constraint creation queries."""
        if not self.conn.is_connected or not self.conn.graph:
            logger.info("FalkorDB offline; skipping live index initialization.")
            return False

        try:
            for query in CypherQueries.INIT_CONSTRAINTS:
                try:
                    self.conn.graph.query(query)
                except Exception as exc:
                    logger.debug("Index creation note (may already exist): %s", exc)
            return True
        except Exception as exc:
            logger.error("Failed to initialize FalkorDB schema: %s", exc)
            return False

    def create_or_get_workspace(self, workspace_id: str, name: str) -> Dict[str, Any]:
        """Ensure workspace node exists."""
        created_at = self._now()
        if self.conn.is_connected and self.conn.graph:
            try:
                res = self.conn.graph.query(
                    CypherQueries.MERGE_WORKSPACE,
                    {"workspace_id": workspace_id, "name": name, "created_at": created_at}
                )
                return {"id": workspace_id, "name": name}
            except Exception as exc:
                logger.error("Cypher error in merge_workspace: %s", exc)

        # In-memory fallback
        node_id = f"ws:{workspace_id}"
        if node_id not in self._in_memory_nodes:
            self._in_memory_nodes[node_id] = {
                "id": workspace_id,
                "label": "Workspace",
                "name": name,
                "workspace_id": workspace_id,
                "created_at": created_at
            }
        return {"id": workspace_id, "name": name}

    def create_memory(
        self,
        memory_id: str,
        workspace_id: str,
        memory_type: MemoryType,
        content: str,
        source_agent_id: str,
        source_session_id: str,
        task_id: str,
        summary: Optional[str] = None
    ) -> MemoryResponse:
        """Create a memory node linked to agent, session, and task."""
        created_at = self._now()
        params = {
            "memory_id": memory_id,
            "workspace_id": workspace_id,
            "memory_type": memory_type.value if hasattr(memory_type, "value") else str(memory_type),
            "content": content,
            "summary": summary or content[:100],
            "agent_id": source_agent_id,
            "session_id": source_session_id,
            "task_id": task_id,
            "created_at": created_at
        }

        if self.conn.is_connected and self.conn.graph:
            try:
                self.conn.graph.query(CypherQueries.CREATE_MEMORY, params)
            except Exception as exc:
                logger.error("Error creating memory in FalkorDB: %s", exc)

        # Record in memory repository
        self._in_memory_nodes[memory_id] = {
            "id": memory_id,
            "label": "Memory",
            "workspace_id": workspace_id,
            "memory_type": params["memory_type"],
            "content": content,
            "summary": params["summary"],
            "source_agent_id": source_agent_id,
            "source_session_id": source_session_id,
            "task_id": task_id,
            "status": "active",
            "created_at": created_at
        }
        # Add relationships
        self._in_memory_edges.append({"source": source_agent_id, "target": memory_id, "label": "CREATED"})
        self._in_memory_edges.append({"source": source_session_id, "target": memory_id, "label": "RECORDED"})
        self._in_memory_edges.append({"source": task_id, "target": memory_id, "label": "HAS_MEMORY"})

        return MemoryResponse(
            id=memory_id,
            workspace_id=workspace_id,
            memory_type=memory_type,
            content=content,
            summary=params["summary"],
            source_agent_id=source_agent_id,
            source_session_id=source_session_id,
            task_id=task_id,
            status="active",
            created_at=created_at
        )

    def retrieve_memories_for_task(self, workspace_id: str, task_id: str) -> List[MemoryResponse]:
        """Retrieve memories relevant to a task within the workspace scope."""
        if self.conn.is_connected and self.conn.graph:
            try:
                res = self.conn.graph.query(
                    CypherQueries.RETRIEVE_MEMORIES_BY_TASK,
                    {"workspace_id": workspace_id, "task_id": task_id}
                )
                memories = []
                for row in res.result_set:
                    # Parse Cypher row
                    memories.append(MemoryResponse(
                        id=row[0],
                        workspace_id=row[1],
                        memory_type=MemoryType(row[2]),
                        content=row[3],
                        summary=row[4],
                        source_agent_id=row[5],
                        source_session_id=row[6],
                        task_id=task_id,
                        status="active",
                        created_at=row[7]
                    ))
                return memories
            except Exception as exc:
                logger.error("Error retrieving memories from FalkorDB: %s", exc)

        # Fallback to internal storage
        results = []
        for node in self._in_memory_nodes.values():
            if (node.get("label") == "Memory" and
                node.get("workspace_id") == workspace_id and
                node.get("task_id") == task_id and
                node.get("status") == "active"):
                results.append(MemoryResponse(
                    id=node["id"],
                    workspace_id=node["workspace_id"],
                    memory_type=MemoryType(node["memory_type"]),
                    content=node["content"],
                    summary=node.get("summary"),
                    source_agent_id=node["source_agent_id"],
                    source_session_id=node["source_session_id"],
                    task_id=node.get("task_id"),
                    status=node.get("status", "active"),
                    created_at=node["created_at"]
                ))
        results.sort(key=lambda m: m.created_at)
        return results

    def link_memory_continuation(self, new_memory_id: str, prior_memory_id: str) -> bool:
        """Create a directional RELATES_TO edge connecting new finding to prior finding."""
        if self.conn.is_connected and self.conn.graph:
            try:
                self.conn.graph.query(
                    CypherQueries.LINK_MEMORY_CONTINUATION,
                    {"new_memory_id": new_memory_id, "prior_memory_id": prior_memory_id}
                )
            except Exception as exc:
                logger.error("Error linking memory in FalkorDB: %s", exc)

        self._in_memory_edges.append({
            "source": new_memory_id,
            "target": prior_memory_id,
            "label": "RELATES_TO"
        })
        return True

    def create_handoff(
        self,
        handoff_id: str,
        workspace_id: str,
        task_id: str,
        source_agent_id: str,
        session_id: str,
        summary: str,
        next_action: str
    ) -> Dict[str, Any]:
        """Record an explicit handoff node."""
        created_at = self._now()
        params = {
            "handoff_id": handoff_id,
            "workspace_id": workspace_id,
            "source_agent_id": source_agent_id,
            "session_id": session_id,
            "task_id": task_id,
            "summary": summary,
            "next_action": next_action,
            "created_at": created_at
        }
        if self.conn.is_connected and self.conn.graph:
            try:
                self.conn.graph.query(CypherQueries.CREATE_HANDOFF, params)
            except Exception as exc:
                logger.error("Error creating handoff in FalkorDB: %s", exc)

        self._in_memory_nodes[handoff_id] = {
            "id": handoff_id,
            "label": "Handoff",
            "workspace_id": workspace_id,
            "task_id": task_id,
            "source_agent_id": source_agent_id,
            "session_id": session_id,
            "summary": summary,
            "next_action": next_action,
            "created_at": created_at
        }
        self._in_memory_edges.append({"source": session_id, "target": handoff_id, "label": "RECORDED"})
        self._in_memory_edges.append({"source": task_id, "target": handoff_id, "label": "HAS_HANDOFF"})

        return params

    def get_workspace_graph(self, workspace_id: str) -> GraphDataResponse:
        """Return all workspace-scoped nodes and edges formatted for React Flow."""
        nodes: List[GraphNode] = []
        edges: List[GraphEdge] = []

        # Map nodes
        x_offset = 50.0
        y_offset = 50.0
        for node_id, data in self._in_memory_nodes.items():
            if data.get("workspace_id") == workspace_id:
                node_type = f"{data.get('label', 'memory').lower()}Node"
                nodes.append(GraphNode(
                    id=node_id,
                    type=node_type,
                    position={"x": x_offset, "y": y_offset},
                    data={
                        "label": data.get("summary") or data.get("name") or data.get("title") or node_id,
                        "type": data.get("memory_type", data.get("label")),
                        "details": data
                    }
                ))
                x_offset += 160.0
                if x_offset > 600.0:
                    x_offset = 50.0
                    y_offset += 120.0

        # Map edges
        for idx, edge in enumerate(self._in_memory_edges):
            edges.append(GraphEdge(
                id=f"e-{idx}",
                source=edge["source"],
                target=edge["target"],
                label=edge.get("label"),
                animated=edge.get("label") == "RELATES_TO"
            ))

        return GraphDataResponse(workspace_id=workspace_id, nodes=nodes, edges=edges)

    def reset_workspace(self, workspace_id: str) -> bool:
        """Clear all workspace data for reproducible demo runs."""
        if self.conn.is_connected and self.conn.graph:
            try:
                self.conn.graph.query(
                    "MATCH (n {workspace_id: $workspace_id}) DETACH DELETE n",
                    {"workspace_id": workspace_id}
                )
            except Exception as exc:
                logger.error("Error resetting workspace in FalkorDB: %s", exc)

        to_delete = [k for k, v in self._in_memory_nodes.items() if v.get("workspace_id") == workspace_id]
        for k in to_delete:
            del self._in_memory_nodes[k]
        self._in_memory_edges = [
            e for e in self._in_memory_edges
            if e["source"] in self._in_memory_nodes and e["target"] in self._in_memory_nodes
        ]
        return True
