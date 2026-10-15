"""Health and status inspection endpoint."""

from fastapi import APIRouter
from ...core.config import settings
from ...graph.connection import get_falkordb_driver

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("")
async def get_health():
    """Report backend health and database connection status without leaking credentials."""
    conn = get_falkordb_driver()
    db_health = conn.check_health()

    return {
        "status": "healthy" if db_health.get("connected") else "degraded",
        "version": settings.VERSION,
        "database": db_health,
        "llm_provider": {
            "provider": settings.LLM_PROVIDER,
            "status": "ready"
        }
    }
