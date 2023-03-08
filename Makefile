.PHONY: compose
compose:
		@docker build -t kidflow . && docker-compose up -d

.PHONY: migrate
migrate:
		python manage.py migrate

.PHONY: run
run: migrate
		python manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:8080

.PHONY: migrations
migrations:
		python manage.py makemigrations

.PHONY: pip
pip:
		python -m pip install --upgrade pip
		python -m pip install -U -r requirements-dev.txt

.PHONY: format-all
format-all:
		isort api/ kidflow/
		black -t py310 -l 120 api/ kidflow/
		flake8 api/ kidflow/