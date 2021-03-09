from typing import Optional

from pydantic import BaseModel, UUID4


class TokenSchema(BaseModel):
    access_token: str
    token_type: str


class TokenPayloadSchema(BaseModel):
    sub: Optional[UUID4] = None

