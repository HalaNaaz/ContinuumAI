import {
  HealthResponse,
  WorkspaceResponse,
  Session,
  SessionDetail,
  TaskRunResponse,
  Memory,
  GraphDataResponse,
  Agent,
  AgentEvent,
  Handoff,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`API Error ${res.status}: ${errorBody}`);
    }
    return (await res.json()) as T;
  } catch (err: any) {
    console.warn(`[API Client] Failed request to ${endpoint}:`, err.message);
    throw err;
  }
}

export const apiClient = {
  // Health & Workspace
  getHealth: () => fetchJson<HealthResponse>('/api/health'),
  getWorkspace: (workspaceId = 'demo-workspace-01') =>
    fetchJson<WorkspaceResponse>(`/api/workspaces/current?workspace_id=${workspaceId}`),
  resetWorkspace: (workspaceId = 'demo-workspace-01') =>
    fetchJson<{ status: string; message: string }>(`/api/workspaces/reset?workspace_id=${workspaceId}`, {
      method: 'POST',
    }),

  // Sessions
  listSessions: (workspaceId = 'demo-workspace-01') =>
    fetchJson<Session[]>(`/api/sessions?workspace_id=${workspaceId}`),
  createSession: (data: { workspace_id: string; agent_id: string; task_id?: string }) =>
    fetchJson<Session>('/api/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getSessionDetail: (sessionId: string) =>
    fetchJson<SessionDetail>(`/api/sessions/${sessionId}`),

  // Tasks & Execution (Session 1 & Session 2)
  runTask: (
    taskId: string,
    data: { workspace_id: string; session_id: string; agent_role: string; mode?: string }
  ) =>
    fetchJson<TaskRunResponse>(`/api/tasks/${taskId}/run`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Agents & Timeline Events
  listAgents: (workspaceId = 'demo-workspace-01') =>
    fetchJson<Agent[]>(`/api/agents?workspace_id=${workspaceId}`),
  getAgentEvents: () => fetchJson<AgentEvent[]>('/api/agents/events'),

  // Memories
  listMemories: (workspaceId = 'demo-workspace-01', taskId?: string) => {
    const q = new URLSearchParams({ workspace_id: workspaceId });
    if (taskId) q.append('task_id', taskId);
    return fetchJson<Memory[]>(`/api/memories?${q.toString()}`);
  },

  // Graph Data (React Flow)
  getGraph: (workspaceId = 'demo-workspace-01') =>
    fetchJson<GraphDataResponse>(`/api/graph?workspace_id=${workspaceId}`),

  // Handoffs
  listHandoffs: (workspaceId = 'demo-workspace-01') =>
    fetchJson<Handoff[]>(`/api/handoffs?workspace_id=${workspaceId}`),
};
