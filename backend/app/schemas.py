"""Pydantic schemas for request validation and response serialization."""
from pydantic import BaseModel, EmailStr, Field
from typing import Literal

Role = Literal["carer", "manager"]


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class UserPublic(BaseModel):
    email: EmailStr
    role: Role
    full_name: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic
    redirect_to: str  # frontend uses this to route after login


class HealthResponse(BaseModel):
    status: Literal["ok"]
    version: str
