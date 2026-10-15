"""FalkorDB connection management with health checks."""

from typing import Any, Optional
from ..core.config import settings
from ..core.logging import logger

try:
    from falkordb import FalkorDB
    FALKORDB_AVAILABLE = True
except ImportError:
    FalkorDB = None
    FALKORDB_AVAILABLE = False


class FalkorDBConnection:
    """Manages connection to the FalkorDB cluster or instance."""

    def __init__(self):
        self._driver: Optional[Any] = None
        self._graph: Optional[Any] = None
        self._connected: bool = False

    def connect(self) -> bool:
        """Connect to FalkorDB using configuration settings."""
        if not FALKORDB_AVAILABLE:
            logger.warning("falkordb package not installed. Running in mock/offline mode.")
            self._connected = False
            return False

        try:
            self._driver = FalkorDB(
                host=settings.FALKORDB_HOST,
                port=settings.FALKORDB_PORT,
                username=settings.FALKORDB_USERNAME,
                password=settings.FALKORDB_PASSWORD
            )
            # Select target graph
            self._graph = self._driver.select_graph(settings.FALKORDB_GRAPH_NAME)
            self._connected = True
            logger.info("Successfully connected to FalkorDB on %s:%s", settings.FALKORDB_HOST, settings.FALKORDB_PORT)
            return True
        except Exception as exc:
            logger.warning("Could not connect to FalkorDB (%s:%s): %s", settings.FALKORDB_HOST, settings.FALKORDB_PORT, exc)
            self._connected = False
            return False

    @property
    def is_connected(self) -> bool:
        return self._connected

    @property
    def graph(self) -> Optional[Any]:
        return self._graph

    def check_health(self) -> dict:
        """Ping database and return health metrics."""
        if not self._connected or not self._graph:
            return {"connected": False, "engine": "FalkorDB", "status": "disconnected"}
        try:
            # Simple ping query
            self._graph.query("RETURN 1 AS ping")
            return {"connected": True, "engine": "FalkorDB", "status": "ready"}
        except Exception as exc:
            logger.error("Health check failed on FalkorDB: %s", exc)
            return {"connected": False, "engine": "FalkorDB", "status": "error", "error": str(exc)}


_db_connection = FalkorDBConnection()


def get_falkordb_driver() -> FalkorDBConnection:
    """Dependency provider for FalkorDB connection."""
    if not _db_connection.is_connected:
        _db_connection.connect()
    return _db_connection
