import logging
from functools import lru_cache
from typing import Any, Dict, List, Optional, Union
from pydantic import AnyHttpUrl, BaseSettings, EmailStr, HttpUrl, validator

logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    # environment
    environment: str = 'dev'
    server_name: str = 'hotline-dev'
    server_host: AnyHttpUrl = 'http://0.0.0.0'
    project_name: str = 'Hotline'

    backend_cors_origins: List[AnyHttpUrl] = []

    @validator('backend_cors_origins', pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith('['):
            return [i.strip() for i in v.split(',')]
        elif isinstance(v, (list,str)):
            return v
        raise ValueError(v)

    # database
    database_uri: str

    # security
    secret_key: str
    access_token_algorithm: str = 'HS256'
    access_token_expiration: int = 60 * 24 * 30 # 30 days in minutes

    class Config:
        env_file = '.env'


@lru_cache()
def get_settings() -> BaseSettings:
    logger.info('Loading config settings from the environment...')
    return Settings()

