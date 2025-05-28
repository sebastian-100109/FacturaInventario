from pydantic_settings import BaseSettings
import secrets
from dotenv import load_dotenv
import os

# Cargar variables del archivo .env
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Auth API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"
    SQLITE_URL: str = "sqlite:///./sql_app.db"
    
    class Config:
        env_file = ".env"

settings = Settings()