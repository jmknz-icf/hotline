from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core import security
from config import get_settings

settings = get_settings()
router = APIRouter()


@router.post('/login', response_model=schemas.TokenSchema)
def login(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    user = crud.user.authenticate(
        db, username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    elif not crud.user.is_active(user):
        raise HTTPException(status_code=400, detail='Inactive user')
    access_token_expires = timedelta(minutes=settings.access_token_expiration)
    return {
        'access_token': security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        'token_type': 'bearer',
    }

