from fastapi import FastAPI, UploadFile, File
from faster_whisper import WhisperModel
import tempfile
import os
from fastapi import Query

fast_model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

accurate_model = WhisperModel(
    "small",
    device="cpu",
    compute_type="float32"
)

app = FastAPI(title="Audio Transcription Service")

# Load model once at startup
model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

@app.post("/transcribe")
async def transcribe_audio(
    file: UploadFile = File(...),
    mode: str = Query("fast")
):
    if mode not in ["fast", "accurate"]:
        return {"error": "Invalid mode"}

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp:
        temp.write(await file.read())
        temp_path = temp.name

    model = fast_model if mode == "fast" else accurate_model

    segments, info = model.transcribe(
        temp_path,
        language="en"
    )

    text = " ".join(segment.text for segment in segments)

    os.remove(temp_path)

    return {
        "mode": mode,
        "language": info.language,
        "text": text
    }