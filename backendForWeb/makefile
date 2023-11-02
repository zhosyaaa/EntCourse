postgres:
	docker run --rm -d --name postgres15 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=1079 -p 5432:5432 postgres:15

createdb:
	docker exec -it postgres15 createdb --username=postgres --owner=postgres webAitu

dropdb:
	docker exec -it postgres15 dropdb -U postgres webAitu

.PHONY: postgres createdb dropdb