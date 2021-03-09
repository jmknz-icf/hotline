from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.core import security
from app.db.session import SessionLocal
from config import get_settings

settings = get_settings()

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl='/api/login'
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> models.User:
    try:
        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=[settings.access_token_algorithm]
        )
        token_data = schemas.TokenPayloadSchema(**payload)
    except (jwt.JWTError, ValidationError) as err:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Could not validate credentials',
        )
    user = crud.user.get(db, id=token_data.sub)
    if not user:
        raise HTTPException(system_code=404, detail='User not found')
    return user


def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not crud.user.is_active(current_user):
        raise HTTPException(
            status_code=400,
            detail='Inactive user'
        )
    return current_user


def get_current_active_superuser(
    current_user: models.User = Depends(get_current_user)
) -> models.User:
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=403,
            detail='The user does not have privilege ot view this resource'
        )
    return current_user


