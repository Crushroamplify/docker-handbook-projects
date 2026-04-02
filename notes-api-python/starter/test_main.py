import json
from main import app


def test_health():
    client = app.test_client()
    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json()["status"] == "ok"


def test_post_and_get_notes():
    client = app.test_client()

    # Clear notes between tests
    from main import notes
    notes.clear()

    # POST a note
    response = client.post(
        "/notes",
        data=json.dumps({"title": "Test", "content": "Hello"}),
        content_type="application/json",
    )
    assert response.status_code == 201
    assert response.get_json()["title"] == "Test"

    # GET notes
    response = client.get("/notes")
    assert response.status_code == 200

    data = response.get_json()
    assert len(data) == 1
    assert data[0]["title"] == "Test"
