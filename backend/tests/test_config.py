"""Test configuration loading and defaults."""

from app.core.config import Settings


def test_settings_defaults():
    settings = Settings()
    assert settings.PROJECT_NAME == "ContinuumAI"
    assert settings.DEFAULT_WORKSPACE_ID == "demo-workspace-01"
    assert settings.FALKORDB_PORT == 6379
    assert "http://localhost:3000" in settings.CORS_ORIGINS
