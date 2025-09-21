# backend/main.py

import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Literal, Optional
from google import genai
from datetime import datetime

# -------------------------------
# 1️⃣ Load environment variables
# -------------------------------
# Make sure you have a .env file in the backend folder with GEMINI_API_KEY=<your_key>
load_dotenv()
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_KEY:
    raise RuntimeError("GEMINI_API_KEY missing in .env file")

# -------------------------------
# 2️⃣ Initialize Gemini client
# -------------------------------
client = genai.Client(api_key=GEMINI_KEY)

# -------------------------------
# 3️⃣ Create FastAPI app
# -------------------------------
app = FastAPI(title="Saudi National Day Chat API")

# -------------------------------
# 3a️⃣ Enable CORS for frontend
# -------------------------------
# Allow requests from the frontend dev server (Vite default port)
origins = [
    "http://localhost:8080",  # <- updated port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # frontend dev server
    allow_credentials=True,
    allow_methods=["*"],           # allow all methods: GET, POST, OPTIONS, etc.
    allow_headers=["*"],           # allow all headers (including Content-Type)
)

# -------------------------------
# 4️⃣ Define Pydantic models
# -------------------------------
class Message(BaseModel):
    role: Literal["user", "assistant"]  # SYSTEM role removed to avoid Gemini 400 error
    content: str
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    conversation: List[Message]  # Previous messages
    new_message: Message         # Latest user message

class ChatResponse(BaseModel):
    assistant_message: Message
    status: str = "ok"

# -------------------------------
# 5️⃣ System instructions
# -------------------------------
SYSTEM_INSTRUCTIONS = ( """

You are an informational guide about Saudi National Day. Focus on the 95th anniversary on September 23, 2025, a public holiday commemorating the 1932 unification under King Abdulaziz. Always answer concisely, clearly, and helpfully. Reflect the theme "Pride in Our Nature" when relevant. 

Important rule: If the user asks a question in Arabic, respond in Arabic. If the question is in English, respond in English. Do not switch languages unnecessarily.
"""
)

# -------------------------------
# 6️⃣ Chat endpoint
# -------------------------------
@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    try:
        # -------------------------------
        # 6a️⃣ Build messages for Gemini
        # -------------------------------
        # Gemini does NOT support "system" role, so prepend instructions to first user message
        user_content = SYSTEM_INSTRUCTIONS + "\n\n" + req.new_message.content
        
        print(f"The new messages:\n{req.new_message.content}")


        # Build contents array for Gemini
        contents = [
            {"role": "user", "parts": [{"text": user_content}]}
        ]

        # Add previous conversation messages (if any)
        for msg in req.conversation:
            contents.append({"role": msg.role, "parts": [{"text": msg.content}]})

        print(f"The conversation :\n{req.conversation}")
            

        # -------------------------------
        # 6b️⃣ Call Gemini API
        # -------------------------------
        resp = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=contents,
        )

        # -------------------------------
        # 6c️⃣ Prepare assistant message
        # -------------------------------
        assistant_message = Message(
            role="assistant",
            content=resp.text.strip(),
            timestamp=datetime.utcnow().isoformat() + "Z"
        )

        return ChatResponse(assistant_message=assistant_message)

    except Exception as e:
        # Catch all Gemini or unexpected errors
        raise HTTPException(status_code=500, detail=f"Gemini API error: {e}")
