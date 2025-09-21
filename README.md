# 🇸🇦 Saudi LLM Chat App

A real-time AI-powered chatbot that answers questions about the Kingdom of Saudi Arabia. Built to celebrate the **95th Saudi National Day**, it leverages the **Gemini 2.0 Flash** language model for fast and accurate responses.

---

## 🌟 Features

* 🤖 **AI Chat:** Ask questions about Saudi Arabia and receive instant answers.
* ⚡ **Backend Endpoint:** `POST /api/chat`
* 🌐 **Frontend Routes:** Fully functional Next.js pages.

---

## 📡 Frontend Routes

| Route      | Component     | Description                                   |
| ---------- | ------------- | --------------------------------------------- |
| `/`        | `ChatPage`    | Main chat interface for asking questions.     |
| `/chat`    | `ChatPage`    | Alternate route to access the chat interface. |
| `/leaders` | `LeadersPage` | Displays information about Saudi leaders.     |
| `*`        | `NotFound`    | Fallback route for any undefined page.        |

---

## 📦 Backend Endpoint

| Method | Endpoint    | Request Body  | Response Model | Description                                                                 |
| ------ | ----------- | ------------- | -------------- | --------------------------------------------------------------------------- |
| POST   | `/api/chat` | `ChatRequest` | `ChatResponse` | Accepts user questions about Saudi Arabia and returns AI-generated answers. |

> **Note:** The backend uses **FastAPI** and the single endpoint serves the frontend chat pages.

---

## 🚀 Tech Stack

* **Frontend:** Next.js
* **Backend:** FastAPI
* **Language Model:** Gemini 2.0 Flash

---

## 📥 Setup & Installation

### 1. Clone the Repo

```bash
git clone <YOUR_REPO_URL>
cd Saudi_LLM_App
```

### 2. Backend Setup

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1   # On Linux/Mac: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

App runs at: [http://localhost:3000](http://localhost:3000)

---

## 🗂 Folder Structure

```
Saudi_LLM_App/
├── backend/            # FastAPI backend (main.py, endpoints)
├── frontend/           # Next.js frontend (pages, components)
├── .env                # Environment variables
├── README.md           # Project documentation
├── requirements.txt    # Python dependencies
└── package.json        # Frontend dependencies
```

---

## 🧪 Environment Variables

* `.env` can include variables such as:

```
API_KEY=<your_model_api_key>
PORT=8000
```

* Follow standard FastAPI practices for secrets and configs.

---

## 🔐 Security Notes

* Run the backend venv in isolation.
* Expose only necessary ports.
* Keep dependencies updated.

---

## 🧑‍💻 Contributing

Contributions are welcome! Fork the repo, add features or fixes, and submit a pull request.

---

## 📜 License

```
MIT License

Copyright (c) 2025 Yasser A. Albogami

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[...standard MIT terms...]


If you want, I can **also make a fully plug-and-play LICENSE file** ready to copy into your repo so it’s complete. Do you want me to do that?
