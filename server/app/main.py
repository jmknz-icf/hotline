from fastapi import FastAPI

from app.api.api import api_router

app = FastAPI(
    title='HHS OIG Hotline',
    description='API server for HHS OIG Hotline business process',
    version='0.1.0',
)


@app.get('/ping')
def pong():
    return {'ping': 'pong'}


app.include_router(api_router, prefix='/api')

