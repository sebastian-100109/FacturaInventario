from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config.settings import settings
from src.db.database import engine, Base
from src.api.routes import router as auth_router

# Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"/openapi.json"
)
origins = [
    "https://factura-inventario-k9wymamz8-sebastian-100109s-projects.vercel.app",  #  frontend en Vercel
    "http://localhost:3000",  # desarrollo local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ⚠️ solo estos dominios podrán hacer peticiones
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Incluir rutas
app.include_router(auth_router)