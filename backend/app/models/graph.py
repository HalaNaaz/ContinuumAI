"""Graph serialization models for React Flow."""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class GraphNode(BaseModel):
    id: str
    type: str  # taskNode, memoryNode, agentNode, sessionNode, handoffNode
    position: Optional[Dict[str, float]] = Field(default_factory=lambda: {"x": 0.0, "y": 0.0})
    data: Dict[str, Any] = Field(default_factory=dict)


class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None
    animated: bool = False
    data: Optional[Dict[str, Any]] = Field(default_factory=dict)


class GraphDataResponse(BaseModel):
    workspace_id: str
    nodes: List[GraphNode] = Field(default_factory=list)
    edges: List[GraphEdge] = Field(default_factory=list)
