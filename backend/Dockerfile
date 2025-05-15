FROM python:3.10

ENV PYTHONPATH=/app/backend/
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

RUN apt-get update && apt-get install -y build-essential python3-dev git

#RUN mkdir -p /app/backend
#
COPY ../requirements.txt ../requirements-dev.txt /app/backend/

RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements-dev.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

