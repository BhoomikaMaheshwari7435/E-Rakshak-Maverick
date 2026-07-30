from flask import Flask, request, jsonify
from faster_whisper import WhisperModel
import os

app = Flask(__name__)

print("Loading Whisper model... Please wait...")

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

print("Whisper model loaded successfully!")

@app.route("/")
def home():
    return "Whisper Server is Running!"


@app.route("/transcribe", methods=["POST"])
def transcribe():

    if "file" not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    file = request.files["file"]

    temp_path = "temp_audio.mpeg"
    file.save(temp_path)

    segments, info = model.transcribe(temp_path)

    transcript = ""

    for segment in segments:
        transcript += segment.text + " "

    os.remove(temp_path)

    return jsonify({
        "language": info.language,
        "transcript": transcript.strip()
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)