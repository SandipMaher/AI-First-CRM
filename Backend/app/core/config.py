from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")


settings = Settings()

if not settings.DATABASE_URL:
    raise ValueError("DATABASE_URL is not set.")

if not settings.GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set.")