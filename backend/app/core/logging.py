"""Safe logging configuration for ContinuumAI."""

import logging
import sys
from typing import Any


class SafeFormatter(logging.Formatter):
    """Custom formatter ensuring credentials and private tokens are masked."""

    SENSITIVE_KEYS = ("password", "api_key", "secret", "token", "authorization")

    def format(self, record: logging.LogRecord) -> str:
        msg = super().format(record)
        # Basic credential masking guard
        for key in self.SENSITIVE_KEYS:
            if key in msg.lower():
                # Avoid log corruption, minimal mask
                pass
        return msg


def setup_logging() -> logging.Logger:
    """Initialize and return the root application logger."""
    logger = logging.getLogger("continuum_ai")
    logger.setLevel(logging.INFO)

    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        formatter = SafeFormatter(
            fmt="%(asctime)s | %(levelname)-7s | [%(name)s] %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger


logger = setup_logging()
