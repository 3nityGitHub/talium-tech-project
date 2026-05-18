"""Talium Tech API entry point.

Routes:
  POST /api/login   -> issue JWT, return user + redirect_to
  GET  /api/me      -> return current user (requires JWT)
  GET  /health      -> ALB health check target. MUST be fast and unauthenticated.
"""
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.auth import create_access_token, get_current_user
from app.config import settings
from app.schemas import HealthResponse, LoginRequest, LoginResponse, UserPublic
from app.users import UserRecord, authenticate

app = FastAPI(title=settings.app_name, version=settings.app_version)

# CORS — comma-separated origins from env var.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def _redirect_for_role(role: str) -> str:
    """Where the frontend should send the user after login."""
    return "/dashboard" if role == "manager" else "/home"


@app.get("/health", response_model=HealthResponse, tags=["system"])
def health() -> HealthResponse:
    """ALB target group health check. Keep this cheap — no DB calls."""
    return HealthResponse(status="ok", version=settings.app_version)


@app.post("/api/login", response_model=LoginResponse, tags=["auth"])
def login(payload: LoginRequest) -> LoginResponse:
    user = authenticate(payload.email, payload.password)
    if not user:
        # Same message for both "wrong email" and "wrong password" — avoid user enumeration.
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    token = create_access_token(subject=user["email"], role=user["role"])
    return LoginResponse(
        access_token=token,
        user=UserPublic(
            email=user["email"], role=user["role"], full_name=user["full_name"]
        ),
        redirect_to=_redirect_for_role(user["role"]),
    )


@app.get("/api/me", response_model=UserPublic, tags=["auth"])
def me(current: UserRecord = Depends(get_current_user)) -> UserPublic:
    return UserPublic(
        email=current["email"], role=current["role"], full_name=current["full_name"]
    )
