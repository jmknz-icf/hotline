from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import EmailStr, UUID4
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from config import get_settings

settings = get_settings()

router = APIRouter()


@router.get('/', response_model=List[schemas.UserSchema])
def get_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_user)
) -> Any:
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post('/', response_model=schemas.UserSchema)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreateSchema,
) -> Any:
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="User with email already exists"
        )
    user = crud.user.get_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=400,
            detail="User with username already exists"
        )
    user = crud.user.create(db, obj_in=user_in)
    return user
