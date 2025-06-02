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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "https://factura-inventario.vercel.app",  # Tu dominio de Vercel
        "http://localhost:3000",  # Para desarrollo local
        "http://localhost:5173",  # Para desarrollo local con Vite
                   
    ],  # Puerto de tu React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(auth_router)