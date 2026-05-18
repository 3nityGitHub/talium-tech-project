"""Auth integration tests — these run in CI before any Docker build."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_ok():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_login_carer_succeeds_and_redirects_to_home():
    r = client.post(
        "/api/login",
        json={"email": "carer@talium-tech.com", "password": "Password123!"},
    )
    assert r.status_code == 200
    body = r.json()
    assert body["user"]["role"] == "carer"
    assert body["redirect_to"] == "/home"
    assert body["access_token"]


def test_login_manager_succeeds_and_redirects_to_dashboard():
    r = client.post(
        "/api/login",
        json={"email": "manager@talium-tech.com", "password": "Password123!"},
    )
    assert r.status_code == 200
    body = r.json()
    assert body["user"]["role"] == "manager"
    assert body["redirect_to"] == "/dashboard"


def test_login_wrong_password_returns_401():
    r = client.post(
        "/api/login",
        json={"email": "carer@talium-tech.com", "password": "wrong"},
    )
    assert r.status_code == 401


def test_login_unknown_user_returns_401():
    r = client.post(
        "/api/login",
        json={"email": "ghost@talium-tech.com", "password": "Password123!"},
    )
    assert r.status_code == 401


def test_me_requires_token():
    r = client.get("/api/me")
    assert r.status_code == 401


def test_me_returns_user_with_valid_token():
    login = client.post(
        "/api/login",
        json={"email": "manager@talium-tech.com", "password": "Password123!"},
    ).json()
    token = login["access_token"]
    r = client.get("/api/me", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["email"] == "manager@talium-tech.com"


def test_me_rejects_garbage_token():
    r = client.get("/api/me", headers={"Authorization": "Bearer not-a-real-jwt"})
    assert r.status_code == 401
