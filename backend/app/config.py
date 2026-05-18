"""Application settings loaded from environment variables.

In production (ECS), these come from the task definition's environment
or from AWS Secrets Manager. Locally, docker-compose injects them.
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # JWT — override JWT_SECRET in prod via Secrets Manager
    jwt_secret: str = "dev-secret-change-me-in-prod"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60

    # CORS — comma-separated origins. In prod set to your ALB / CloudFront domain.
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    # App
    app_name: str = "Talium Tech API"
    app_version: str = "0.1.0"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
