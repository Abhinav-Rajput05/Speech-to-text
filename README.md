# 🎙️ Audio Transcription System (Full-Stack)

A full-stack **Speech-to-Text platform** built using **React**, **Spring Boot**, and **Python (FastAPI + Whisper)**.  
The system follows **real-world microservice architecture**, separating API orchestration from ML inference.

---

## 🚀 Features

- Upload audio files and get text transcription
- **Speed vs Accuracy mode**
  - `fast` → quick response, lower accuracy
  - `accurate` → slower response, higher accuracy
- Automatic **language detection**
- Interactive frontend with **progress bar**
- Clean API gateway design
- End-to-end tested using **Postman** and **UI**

---

## 🏗️ System Architecture

Frontend (React + Vite)
↓
Spring Boot (API Gateway)
↓
Python FastAPI (ML Inference - Whisper)

### Why this architecture?
- Java handles validation, API design, and scalability
- Python handles ML inference using a rich ML ecosystem
- Clear separation of concerns (industry-standard practice)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Fetch API

### Backend (API Gateway)
- Java
- Spring Boot
- WebClient (WebFlux)
- Maven

### ML Service
- Python
- FastAPI
- Whisper / faster-whisper
- Uvicorn

---

## ⚙️ Setup Instructions

### 1️⃣ Python Transcription Service

```bash
cd audio-transcription-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000

Service runs at:
http://localhost:8000

2️⃣ Spring Boot Backend
cd audio-transcription-backend
mvn spring-boot:run

Backend runs at:
http://localhost:8080

3️⃣ React Frontend
cd audio-transcription-ui
npm install
npm run dev

Frontend runs at:
http://localhost:5173

🔁 API Usage
Endpoint
POST /api/transcribe

Query Parameters
mode=fast
mode=accurate
Request
Type: Filepart/form-data
Key: file
Value: audio file (.wav, .mp3, .m4a)

Sample Response
{
  "text": "Hello this is a sample transcription",
  "language": "en",
  "mode": "fast"
}

🧠 Learning Outcomes
This project demonstrates:


Full-stack system design


Java ↔ Python microservice communication


ML inference integration


Feature toggles (speed vs accuracy)


Frontend-controlled backend behavior


Real-world debugging and validation mindset



📌 Future Improvements


Docker & Docker Compose


Centralized error handling


Async transcription jobs


Audio duration validation


Cloud deployment


Transcription history & downloads



📄 Resume Description

Built a full-stack audio transcription system using React, Spring Boot, and Python (FastAPI + Whisper). Designed a Java-based API gateway to orchestrate requests and a Python ML microservice for speech-to-text inference. Implemented configurable accuracy vs speed modes, language detection, and an interactive frontend with progress feedback.


👨‍💻 Author
Abhinav
B.Tech Computer Science (AIML)
Focus: Backend Engineering, ML Systems, System Design

---

### ✅ What I Fixed (Quietly)
- Corrected **Spelling & Grammar** (Speech, not Specch)
- Fixed **Markdown formatting**
- Separated commands and descriptions correctly
- Made it **recruiter-readable**
- Made it **GitHub-clean**

---

### Next (Optional, High Value)
If you want, I can:
- Add **screenshots section**
- Add **architecture diagram (Mermaid)**
- Add **badges (Tech stack / status)**
- Convert this into a **college project report**
- Review your **GitHub repo like an interviewer**

Just tell me 👍

