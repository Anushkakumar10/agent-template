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
        "email": "deployuser@example.com",
        "username": "deployuser",
        "password": "password123",
    }
    res = client.post("/api/auth/register", json=reg_payload)
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_deployments_flow(client: TestClient, auth_header: dict):
    # 1. Get supported providers
    res_prov = client.get("/api/deployments/providers")
    assert res_prov.status_code == 200
    providers = res_prov.json()
    provider_ids = [p["provider_id"] for p in providers]
    assert "vercel" in provider_ids
    assert "render" in provider_ids

    # 2. Create an Agent Project
    create_payload = {
        "name": "Deployable Agent",
        "description": "Agent to deploy",
        "config": {
            "ai_framework": "pydantic_ai",
            "llm_provider": "google",
            "frontend": "nextjs",
            "database": "postgresql",
            "background_tasks": "none",
        },
    }
    res_agent = client.post("/api/agents", json=create_payload, headers=auth_header)
    assert res_agent.status_code == 201
    agent_id = res_agent.json()["id"]

    # 3. Trigger Vercel deployment
    vercel_payload = {"provider": "vercel", "target_type": "frontend"}
    res_v = client.post(f"/api/agents/{agent_id}/deploy", json=vercel_payload, headers=auth_header)
    assert res_v.status_code == 201
    dep_v = res_v.json()
    assert dep_v["provider"] == "vercel"
    assert dep_v["status"] == "success"
    assert "vercel.app" in dep_v["deployment_url"]

    # 4. Trigger Render deployment
    render_payload = {"provider": "render", "target_type": "backend"}
    res_r = client.post(f"/api/agents/{agent_id}/deploy", json=render_payload, headers=auth_header)
    assert res_r.status_code == 201
    dep_r = res_r.json()
    assert dep_r["provider"] == "render"
    assert dep_r["status"] == "success"
    assert "onrender.com" in dep_r["deployment_url"]

    # 5. List agent deployments
    res_list = client.get(f"/api/agents/{agent_id}/deployments", headers=auth_header)
    assert res_list.status_code == 200
    assert len(res_list.json()) == 2
