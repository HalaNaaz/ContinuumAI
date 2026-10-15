"""Configuration management using Pydantic Settings."""

from typing import List, Optional
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings validated from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Application
    PROJECT_NAME: str = "ContinuumAI"
    VERSION: str = "0.1.0"
    ENVIRONMENT: str = Field(default="development", description="Runtime environment")
    BACKEND_HOST: str = Field(default="0.0.0.0", description="Backend host")
    BACKEND_PORT: int = Field(default=8000, description="Backend port")
    CORS_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://127.0.0.1:3000"],
        description="Allowed CORS origins"
    )

    # FalkorDB Configuration (Primary Graph DB)
    FALKORDB_HOST: str = Field(default="localhost", description="FalkorDB host or cloud endpoint")
    FALKORDB_PORT: int = Field(default=6379, description="FalkorDB port")
    FALKORDB_USERNAME: Optional[str] = Field(default=None, description="FalkorDB username")
    FALKORDB_PASSWORD: Optional[str] = Field(default=None, description="FalkorDB password")
    FALKORDB_GRAPH_NAME: str = Field(default="continuum_ai", description="Graph database name")

    # LLM Provider Configuration
    LLM_PROVIDER: str = Field(default="mock", description="LLM provider: mock | gemini | openai")
    LLM_API_KEY: Optional[str] = Field(default=None, description="Model provider API key")
    LLM_MODEL: str = Field(default="gemini-1.5-flash", description="Target model name")

    # Default Workspace for Demo
    DEFAULT_WORKSPACE_ID: str = Field(default="demo-workspace-01", description="Default tenant workspace")

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v


settings = Settings()
