.PHONY: compose
compose:
		@docker build -t panthercat . && docker-compose up -d