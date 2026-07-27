import pytest
from fastapi.testclient import TestClient

from app.config import settings

# Force SQLite for test execution
settings.DATABASE_URL = "sqlite+aiosqlite:///:memory:"

from app.main import app


@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


def test_health_check(client: TestClient):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_auth_flow(client: TestClient):
    # 1. Register user
    reg_payload = {
        "email": "testuser@example.com",
        "username": "testuser",
        "password": "secretpassword123",
        "full_name": "Test User",
    }
    res_reg = client.post("/api/auth/register", json=reg_payload)
    assert res_reg.status_code == 201
    data = res_reg.json()
    assert "access_token" in data
    assert data["user"]["email"] == "testuser@example.com"
    token = data["access_token"]

    # 2. Get me with token
    res_me = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res_me.status_code == 200
    assert res_me.json()["username"] == "testuser"

    # 3. Login user
    login_payload = {
        "email_or_username": "testuser",
        "password": "secretpassword123",
    }
    res_login = client.post("/api/auth/login", json=login_payload)
    assert res_login.status_code == 200
    assert "access_token" in res_login.json()
