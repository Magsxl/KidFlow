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