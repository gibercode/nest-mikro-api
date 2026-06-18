## Production deploy with Docker, Caddy and VPS

Set the domain, email and database password values in `.env`.

Make sure the DNS `A` record for `DOMAIN` points to the VPS public IP and that
ports `80` and `443` are open in the VPS firewall. Caddy will receive public
traffic, issue the TLS certificate automatically and proxy requests to the Nest
container on the private Docker network.

Build and start the production stack:

```bash
docker compose --env-file .env -f docker-compose.prod.yml up -d --build
```

Check logs:

```bash
docker compose --env-file .env -f docker-compose.prod.yml logs -f
```

Stop the stack:

```bash
docker compose --env-file .env -f docker-compose.prod.yml down
```

## Project setup

```bash
pnpm install
```

## Compile and run the project

```bash
pnpm run start
pnpm run start:dev
pnpm run start:prod
```

## Run tests

```bash
pnpm run test
```
