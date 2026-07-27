from unittest.mock import patch
import pytest
from fastapi.testclient import TestClient

from app.config import settings

settings.DATABASE_URL = "sqlite+aiosqlite:///:memory:"

from app.main import app


@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


@pytest.fixture
def auth_header(client: TestClient):
    reg_payload = {
        "email": "agentuser@example.com",
        "username": "agentuser",
        "password": "password123",
    }
    res = client.post("/api/auth/register", json=reg_payload)
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_template_options_and_presets(client: TestClient):
    res_opts = client.get("/api/templates/options")
    assert res_opts.status_code == 200
    assert "enums" in res_opts.json()
    assert "defaults" in res_opts.json()

    res_presets = client.get("/api/templates/presets")
    assert res_presets.status_code == 200
    assert len(res_presets.json()) >= 3


def test_agent_crud_and_zip_download(client: TestClient, auth_header: dict, tmp_path):
    # Create a mock zip file for testing download endpoint
    mock_zip = tmp_path / "test_ai_agent.zip"
    mock_zip.write_bytes(b"PK\x03\x04mockzipcontent")

    # 1. Create Agent Project
    create_payload = {
        "name": "Test AI Agent",
        "description": "A test agent for dashboard",
        "config": {
            "ai_framework": "pydantic_ai",
            "llm_provider": "google",
            "frontend": "nextjs",
            "database": "postgresql",
            "background_tasks": "none",
        },
    }
    res_create = client.post("/api/agents", json=create_payload, headers=auth_header)
    assert res_create.status_code == 201
    agent = res_create.json()
    assert agent["name"] == "Test AI Agent"
    assert agent["slug"] == "test_ai_agent"
    agent_id = agent["id"]

    # 2. List Agents
    res_list = client.get("/api/agents", headers=auth_header)
    assert res_list.status_code == 200
    assert len(res_list.json()) == 1

    # 3. Get Agent
    res_get = client.get(f"/api/agents/{agent_id}", headers=auth_header)
    assert res_get.status_code == 200
    assert res_get.json()["id"] == agent_id

    # 4. Download Zip (with mocked generator)
    with patch("app.routers.agents.generate_agent_zip", return_value=str(mock_zip)):
        res_zip = client.get(f"/api/agents/{agent_id}/download-zip", headers=auth_header)
        assert res_zip.status_code == 200
        assert res_zip.headers["content-type"] == "application/zip"
        assert "test_ai_agent.zip" in res_zip.headers["content-disposition"]
        assert len(res_zip.content) > 10
