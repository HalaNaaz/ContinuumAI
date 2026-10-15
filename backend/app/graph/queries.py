"""Parameterized Cypher queries for FalkorDB operations."""

class CypherQueries:
    """Central repository of parameterized Cypher statements."""

    # Schema Constraints and Indexes
    INIT_CONSTRAINTS = [
        "CREATE INDEX FOR (w:Workspace) ON (w.id)",
        "CREATE INDEX FOR (m:Memory) ON (m.id)",
        "CREATE INDEX FOR (t:Task) ON (t.id)",
        "CREATE INDEX FOR (s:Session) ON (s.id)",
        "CREATE INDEX FOR (a:Agent) ON (a.id)",
    ]

    # Workspace
    MERGE_WORKSPACE = """
    MERGE (w:Workspace {id: $workspace_id})
    ON CREATE SET w.name = $name, w.created_at = $created_at
    RETURN w.id AS id, w.name AS name
    """

    # Agent
    MERGE_AGENT = """
    MATCH (w:Workspace {id: $workspace_id})
    MERGE (a:Agent {id: $agent_id})
    ON CREATE SET a.role = $role, a.status = $status, a.workspace_id = $workspace_id
    MERGE (w)-[:HAS_AGENT]->(a)
    RETURN a.id AS id, a.role AS role
    """

    # Session
    CREATE_SESSION = """
    MATCH (w:Workspace {id: $workspace_id})
    MATCH (a:Agent {id: $agent_id})
    CREATE (s:Session {
        id: $session_id,
        workspace_id: $workspace_id,
        status: $status,
        started_at: $started_at
    })
    CREATE (w)-[:HAS_SESSION]->(s)
    CREATE (a)-[:PARTICIPATED_IN]->(s)
    RETURN s.id AS id
    """

    # Task
    CREATE_TASK = """
    MATCH (w:Workspace {id: $workspace_id})
    CREATE (t:Task {
        id: $task_id,
        workspace_id: $workspace_id,
        title: $title,
        status: $status,
        context: $context,
        created_at: $created_at
    })
    CREATE (w)-[:HAS_TASK]->(t)
    RETURN t.id AS id
    """

    # Memory creation with full provenance
    CREATE_MEMORY = """
    MATCH (w:Workspace {id: $workspace_id})
    MATCH (a:Agent {id: $agent_id})
    MATCH (s:Session {id: $session_id})
    MATCH (t:Task {id: $task_id})
    CREATE (m:Memory {
        id: $memory_id,
        workspace_id: $workspace_id,
        memory_type: $memory_type,
        content: $content,
        summary: $summary,
        source_agent_id: $agent_id,
        source_session_id: $session_id,
        status: 'active',
        created_at: $created_at
    })
    CREATE (a)-[:CREATED]->(m)
    CREATE (s)-[:RECORDED]->(m)
    CREATE (t)-[:HAS_MEMORY]->(m)
    RETURN m.id AS id
    """

    # Cross-session memory retrieval by task context
    RETRIEVE_MEMORIES_BY_TASK = """
    MATCH (w:Workspace {id: $workspace_id})-[:HAS_TASK]->(t:Task {id: $task_id})
    MATCH (t)-[:HAS_MEMORY]->(m:Memory {status: 'active'})
    RETURN m.id AS id,
           m.workspace_id AS workspace_id,
           m.memory_type AS memory_type,
           m.content AS content,
           m.summary AS summary,
           m.source_agent_id AS source_agent_id,
           m.source_session_id AS source_session_id,
           m.created_at AS created_at
    ORDER BY m.created_at ASC
    """

    # Link continuation memory to prior memory
    LINK_MEMORY_CONTINUATION = """
    MATCH (prior:Memory {id: $prior_memory_id})
    MATCH (newMem:Memory {id: $new_memory_id})
    CREATE (newMem)-[:RELATES_TO {relationship: 'continues_investigation'}]->(prior)
    RETURN newMem.id AS source, prior.id AS target
    """

    # Create Handoff entity
    CREATE_HANDOFF = """
    MATCH (src:Agent {id: $source_agent_id})
    MATCH (s:Session {id: $session_id})
    MATCH (t:Task {id: $task_id})
    CREATE (h:Handoff {
        id: $handoff_id,
        workspace_id: $workspace_id,
        summary: $summary,
        next_action: $next_action,
        created_at: $created_at
    })
    CREATE (s)-[:RECORDED]->(h)
    CREATE (t)-[:HAS_HANDOFF]->(h)
    RETURN h.id AS id
    """

    # List all memories in workspace
    LIST_MEMORIES = """
    MATCH (w:Workspace {id: $workspace_id})
    MATCH (m:Memory {workspace_id: $workspace_id})
    RETURN m.id AS id,
           m.workspace_id AS workspace_id,
           m.memory_type AS memory_type,
           m.content AS content,
           m.summary AS summary,
           m.source_agent_id AS source_agent_id,
           m.source_session_id AS source_session_id,
           m.status AS status,
           m.created_at AS created_at
    ORDER BY m.created_at DESC
    LIMIT $limit
    """

    # Get graph nodes and edges for visualization
    GET_WORKSPACE_GRAPH = """
    MATCH (n {workspace_id: $workspace_id})
    OPTIONAL MATCH (n)-[r]->(m {workspace_id: $workspace_id})
    RETURN n, r, m
    """
