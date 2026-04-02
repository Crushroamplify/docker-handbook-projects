import os
from flask import Flask, request, jsonify

app = Flask(__name__)

LLM_MODE = os.environ.get("LLM_MODE", "smoke")
LLM_MODEL_PATH = os.environ.get("LLM_MODEL_PATH", "/models")


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "mode": LLM_MODE})


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json(force=True)
    prompt = data.get("prompt", "")

    if LLM_MODE == "smoke":
        response_text = "This is a smoke test response."
    else:
        response_text = (
            f"[full mode] Received prompt: '{prompt}'. "
            "In a real deployment, a model loaded from "
            f"'{LLM_MODEL_PATH}' would generate a response here."
        )

    return jsonify({"response": response_text})


if __name__ == "__main__":
    print(f"Starting LLM runtime demo in '{LLM_MODE}' mode")
    print(f"Model path: {LLM_MODEL_PATH}")
    app.run(host="0.0.0.0", port=8080)
