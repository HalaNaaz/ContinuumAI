export type MemoryType = 'episodic' | 'semantic' | 'procedural';

export interface Memory {
  id: string;
  workspace_id: string;
  memory_type: MemoryType;
  content: string;
  summary?: string;
  source_agent_id: string;
  source_session_id: string;
  task_id?: string;
  status: string;
  created_at: string;
  updated_at?: string;
  metadata?: Record<string, any>;
}

export interface Session {
  id: string;
  workspace_id: string;
  status: string;
  agent_ids: string[];
  task_id?: string;
  started_at: string;
  ended_at?: string;
}

export interface SessionDetail extends Session {
  memories_created: Memory[];
  memories_retrieved: Memory[];
  handoff_summary?: string;
}

export interface Agent {
  id: string;
  workspace_id: string;
  role: 'Investigator' | 'Continuation' | 'Coordinator';
  status: 'idle' | 'running' | 'completed' | 'error';
  last_active?: string;
}

export interface AgentEvent {
  id: string;
  timestamp: string;
  agent_id: string;
  session_id: string;
  event_type: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface Task {
  id: string;
  workspace_id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'resolved';
  context?: string;
  created_at: string;
}

export interface TaskRunResponse {
  task_id: string;
  session_id: string;
  status: string;
  summary: string;
  memories_retrieved: string[];
  memories_created: string[];
  next_action?: string;
  handoff_created: boolean;
}

export interface Handoff {
  id: string;
  workspace_id: string;
  task_id: string;
  source_agent_id: string;
  target_agent_id?: string;
  session_id: string;
  summary: string;
  next_action: string;
  created_at: string;
}

export interface GraphNode {
  id: string;
  type: string;
  position?: { x: number; y: number };
  data: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface GraphDataResponse {
  workspace_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface WorkspaceResponse {
  id: string;
  name: string;
  created_at: string;
  stats: {
    agents_count: number;
    sessions_count: number;
    memories_count: number;
    tasks_count: number;
  };
}

export interface HealthResponse {
  status: string;
  version: string;
  database: {
    connected: boolean;
    engine: string;
    status: string;
  };
  llm_provider: {
    provider: string;
    status: string;
  };
}
