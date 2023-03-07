FROM python:3.10

ENV PYTHONPATH=/app

RUN apt-get update && apt-get install -y build-essential python3-dev git

RUN mkdir -p /app

COPY requirements.txt ./app/

RUN pip install --upgrade pip && pip install --no-cache-dir -r app/requirements.txt

COPY . /app/

WORKDIR /app

EXPOSE 8000
CMD ["python", "manage.py", "runserver"]