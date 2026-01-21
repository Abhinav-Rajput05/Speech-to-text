import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("fast");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an audio file");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:8080/api/transcribe?mode=${mode}`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const text = await response.text();
      setResult(text);
    } catch (e) {
      setError("Transcription failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadTranscript = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Audio Transcription</h1>
        <p className="subtitle">Upload audio and get text instantly</p>

        <div className={`wave ${loading ? "active" : ""}`}>
          <span></span><span></span><span></span><span></span><span></span>
        </div>

        <select
          className="select"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="fast">Fast Mode</option>
          <option value="accurate">Accurate Mode</option>
        </select>

        <input
          type="file"
          accept="audio/*"
          className="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && <p className="fileName">{file.name}</p>}

        <button
          className="btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Transcribe"}
        </button>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <pre>{result}</pre>
            <button className="download" onClick={downloadTranscript}>
              Download Transcript
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
