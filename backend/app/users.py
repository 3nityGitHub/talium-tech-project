"""In-memory user store.

For now we hardcode two users. When you wire up a real database (Postgres
on RDS), replace `_USERS` with a SQLAlchemy session and keep the same
`authenticate()` signature — the rest of the app won't need to change.
"""
from passlib.context import CryptContext
from typing import Optional, TypedDict

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserRecord(TypedDict):
    email: str
    role: str
    full_name: str
    hashed_password: str


# Hash once at import time. The plaintext "Password123!" never enters memory
# after this module loads.
def _seed() -> dict[str, UserRecord]:
    seed_password = "Password123!"
    hashed = pwd_context.hash(seed_password)
    return {
        "carer@talium-tech.com": {
            "email": "carer@talium-tech.com",
            "role": "carer",
            "full_name": "Care Worker",
            "hashed_password": hashed,
        },
        "manager@talium-tech.com": {
            "email": "manager@talium-tech.com",
            "role": "manager",
            "full_name": "Service Manager",
            "hashed_password": hashed,
        },
    }


_USERS: dict[str, UserRecord] = _seed()


def get_user(email: str) -> Optional[UserRecord]:
    return _USERS.get(email.lower())


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def authenticate(email: str, password: str) -> Optional[UserRecord]:
    """Return the user record if credentials are valid, else None."""
    user = get_user(email)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user
