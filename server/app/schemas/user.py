from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, UUID4


class UserBaseSchema(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    first_name: Optional[str]
    last_name: Optional[str]
    full_name: Optional[str]


class UserCreateSchema(UserBaseSchema):
    username: str
    email: EmailStr
    password: str


class UserUpdateSchema(UserBaseSchema):
    password: Optional[str] = None


class UserInDBBaseSchema(UserBaseSchema):
    id: Optional[UUID4] = None

    class Config:
        orm_mode = True


class UserSchema(UserInDBBaseSchema):
    pass


class UserInDBSchema(UserInDBBaseSchema):
    hashed_password: str

