# file: saudi_national_day_chat.py
# Run:
#   pip install google-genai python-dotenv
# Then:
#   create a .env file with GEMINI_API_KEY=... in the same directory.

from dotenv import load_dotenv  # Load variables from .env. [web:33]
import os
from google import genai  # Gemini Python client. [web:2]
import sys

SYSTEM_ROLE = (
    "You are an info guide about Saudi National Day. "
    "Focus on the 95th anniversary on September 23, 2025, "
    "a public holiday commemorating the 1932 unification under King Abdulaziz. "
    "Answer in English concisely and helpfully, and reflect the theme "
    "“Pride in Our Nature” when relevant."
)  # Context and 2025 theme. [web:2][web:28]

def main():
    # Load .env so GEMINI_API_KEY becomes available via os.environ. [web:33][web:35]
    load_dotenv()

    # Optional safety check (kept as-is, using os.getenv exactly)
    if not os.getenv("GEMINI_API_KEY"):
        print("GEMINI_API_KEY was not found in the environment or .env file.", file=sys.stderr)  # Error message. [web:33]
        sys.exit(1)

    # Client explicitly uses the key from os.getenv, as requested. [web:37]
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    print("Saudi National Day Assistant (type 'exit' to quit).")  # Loop banner. [web:2]
    while True:
        try:
            q = input("\nQuestion: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nExited.")
            break

        if q.lower() == "exit":
            print("Goodbye.")
            break

        if not q:
            print("Please enter a question or type 'exit'.")
            continue

        try:
            resp = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    {"role": "user", "parts": [{"text": SYSTEM_ROLE}]},
                    {"role": "user", "parts": [{"text": q}]},
                ],
            )  # Generate answer with role context. [web:2]
            print("\nAnswer:", resp.text)
        except Exception as e:
            print("An error occurred while calling the Gemini API:", e)

if __name__ == "__main__":
    main()
