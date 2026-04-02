from flask import Flask, jsonify, request

app = Flask(__name__)

notes = []


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/notes", methods=["GET"])
def get_notes():
    return jsonify(notes)


@app.route("/notes", methods=["POST"])
def create_note():
    data = request.get_json()

    if not data:
        return jsonify({"error": "invalid JSON"}), 400

    note = {
        "title": data.get("title", ""),
        "content": data.get("content", ""),
    }

    notes.append(note)
    return jsonify(note), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
