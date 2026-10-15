"""Main API router aggregating all endpoints."""

from fastapi import APIRouter
from .routes import health, workspaces, sessions, tasks, agents, memories, graph, handoffs

api_router = APIRouter(prefix="/api")

api_router.include_router(health.router)
api_router.include_router(workspaces.router)
api_router.include_router(sessions.router)
api_router.include_router(tasks.router)
api_router.include_router(agents.router)
api_router.include_router(memories.router)
api_router.include_router(graph.router)
api_router.include_router(handoffs.router)
