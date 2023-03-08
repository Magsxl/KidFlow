FROM python:3.10

ENV PYTHONPATH=/app

RUN apt-get update && apt-get install -y build-essential python3-dev git

RUN mkdir -p /app

COPY requirements.txt requirements-dev.txt ./app/

RUN pip install --upgrade pip && pip install --no-cache-dir -r app/requirements-dev.txt

COPY . /app/

WORKDIR /app

CMD ["make", "run"]

EXPOSE 8080