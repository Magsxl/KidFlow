.PHONY: compose
compose:
		@docker build -t kidflow . && docker-compose up -d

.PHONY: migrate
migrate:
		python manage.py migrate

.PHONY: run
run: migrate
	python manage.py collectstatic --noinput && python manage.py runserver 127.0.0.1:8080
