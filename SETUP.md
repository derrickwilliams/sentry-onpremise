connect to docker host (however you do it)

create persistent volumes
```sh
docker volume create --name sentry-main-data --driver local
docker volume create --name sentry-postgres-data --driver local
```

setup
```sh
docker-compose run --rm web config generate-secret-key
# Add secret key to `docker-compose.yml` in `base` as `SENTRY_SECRET_KEY`.
docker-compose run --rm web upgrade

# if not prompted to create user during upgrade
docker-compose run --rm web createuser
```

run
```sh
docker-compose up -d
```

goto http://***docker host ip***:9000
