from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from src.db.database import get_db
from src.models.user import User
from src.schemas.user import User as UserSchema, UserCreate, Token
from src.security.auth import create_user, login_user
from src.utils.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
def register(user_create: UserCreate, db: Session = Depends(get_db)):
    """
    Registrar un nuevo usuario
    """
    return create_user(db, user_create.email, user_create.password)

@router.post("/login", response_model=Token)
def login_endpoint(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Iniciar sesión para obtener token de acceso
    """
    return login_user(db, form_data.username, form_data.password)

@router.get("/ver-datos", response_model=List[UserSchema])
def ver_datos(db: Session = Depends(get_db)):
    """
    Obtiene todos los registros de usuarios de la base de datos
    """
    users = db.query(User).all()
    return users