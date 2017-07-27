# Vamp Music


Vamp Music is a set of demo services with an front end and api gateway.
It uses [Lerna](https://lernajs.io/) to manage all the packages in the repo and
docker-compose to spin up a local dev environment, similar to an eventual Vamp environment.

Requirements:
-   Node.js
-   Docker and Docker-Compose
-   Lerna

Install

```bash
npm install --global lerna
lerna bootstrap
lerna run docker:build
docker-compose up
```

Now hit `localhost:80`
