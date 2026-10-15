"""Task lifecycle and state management service."""

import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional
from ..core.config import settings
from ..graph.repository import FalkorDBRepository
from ..models.task import TaskCreate, TaskResponse
from ..core.logging import logger


class TaskService:
    """Manages tasks with workspace isolation and persistence fallback."""

    def __init__(self, repo: Optional[FalkorDBRepository] = None):
        self.repo = repo
        self._tasks: Dict[str, Dict] = {}
        self._seed_default_task()

    def _now(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def _seed_default_task(self):
        """Seed initial demonstration task in default workspace."""
        task_id = "task-01"
        self._tasks[task_id] = {
            "id": task_id,
            "workspace_id": settings.DEFAULT_WORKSPACE_ID,
            "title": "Investigate Payment Service Latency Spike",
            "status": "pending",
            "context": "Service experiencing 504 timeouts on checkout under sustained load.",
            "created_at": "2026-10-10T14:00:00Z",
            "resolved_at": None,
        }

    def create_task(self, task_in: TaskCreate) -> TaskResponse:
        """Create a new task within a workspace."""
        task_id = f"task-{uuid.uuid4().hex[:6]}"
        now = self._now()
        task_data = {
            "id": task_id,
            "workspace_id": task_in.workspace_id,
            "title": task_in.title,
            "status": "pending",
            "context": task_in.context,
            "created_at": now,
            "resolved_at": None,
        }
        self._tasks[task_id] = task_data
        logger.info("Task '%s' created for workspace '%s'", task_id, task_in.workspace_id)
        return TaskResponse(**task_data)

    def get_task(self, task_id: str, workspace_id: Optional[str] = None) -> Optional[TaskResponse]:
        """Get task by ID, optionally validating workspace isolation."""
        if task_id not in self._tasks:
            return None
        task_data = self._tasks[task_id]
        if workspace_id and task_data.get("workspace_id") != workspace_id:
            return None
        return TaskResponse(**task_data)

    def list_tasks(self, workspace_id: str) -> List[TaskResponse]:
        """List all tasks scoped to a specific workspace."""
        results = [
            TaskResponse(**t)
            for t in self._tasks.values()
            if t.get("workspace_id") == workspace_id
        ]
        results.sort(key=lambda t: t.created_at, reverse=True)
        return results

    def update_task_status(
        self,
        task_id: str,
        status: str,
        workspace_id: Optional[str] = None
    ) -> Optional[TaskResponse]:
        """Update a task's status with workspace validation."""
        task = self.get_task(task_id, workspace_id=workspace_id)
        if not task:
            return None
        self._tasks[task_id]["status"] = status
        if status == "resolved":
            self._tasks[task_id]["resolved_at"] = self._now()
        return TaskResponse(**self._tasks[task_id])

    def reset_workspace(self, workspace_id: str):
        """Remove tasks belonging to a workspace. Reseed demo task if default."""
        to_delete = [
            tid for tid, data in self._tasks.items()
            if data.get("workspace_id") == workspace_id
        ]
        for tid in to_delete:
            del self._tasks[tid]
        if workspace_id == settings.DEFAULT_WORKSPACE_ID:
            self._seed_default_task()
