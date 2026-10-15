"""ContinuumAI FastAPI Application Entry Point."""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.logging import logger
from .api.router import api_router
from .graph.connection import get_falkordb_driver
from .api.deps import get_repository


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle event for connection and schema initialization."""
    logger.info("Starting %s v%s in %s mode...", settings.PROJECT_NAME, settings.VERSION, settings.ENVIRONMENT)
    conn = get_falkordb_driver()
    if conn.connect():
        repo = get_repository()
        repo.initialize_schema()
        repo.create_or_get_workspace(settings.DEFAULT_WORKSPACE_ID, "ContinuumAI Demo Workspace")
    else:
        logger.warning("FalkorDB not connected. App will use internal fallback memory store for demo/tests.")
    yield
    logger.info("Shutting down %s...", settings.PROJECT_NAME)


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Graph-powered memory and coordination layer for multi-agent AI workflows.",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router
app.include_router(api_router)


@app.get("/")
async def root():
    """Root redirect / information endpoint."""
    return {
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs_url": "/docs",
        "health_url": "/api/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.BACKEND_HOST, port=settings.BACKEND_PORT, reload=True)
