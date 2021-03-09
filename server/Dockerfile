FROM python:3.8-alpine

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/usr/src/app

COPY ./pyproject.toml ./poetry.lock* /usr/src/app/

RUN set -eux \
    && apk add --no-cache --virtual .build-deps build-base \
        libressl-dev libffi-dev gcc musl-dev python3-dev \
        libxml12-dev libxslt-dev \
        postgresql-dev \
    && pip install --upgrade pip setuptools wheel \
    && pip install poetry \
    && rm -rf /root/.cache/pip

RUN poetry config virtualenvs.create false && poetry install
COPY . /usr/src/app/

