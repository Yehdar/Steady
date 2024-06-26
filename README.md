# Steady

## Abstract

Project management service

<p align="center"><img src="https://github.com/Yehdar/steady/blob/main/demo/demo.png" width="80%"></p>

### Technologies Used

Python, Flask, TypeScript, React, Axios, TailwindCSS, PostgreSQL, SQLAlchemy, Docker Compose, Postman, Chrome DevTools

## Documentation

### Backend

- if on a linux environment, remember to add `sudo` to every docker command.
- to build docker image: `sudo docker-compose build {name}`
- to boot up the database container: `sudo docker-compose up -d db`
- to access database: `sudo docker exec -it db psql -U postgres`
- to check docker containers: `sudo docker ps -a`
- to debug by checking docker logs: `sudo docker-compose logs {image name}`
- to setup venv:
  $ virtualenv venv
  $ source venv/bin/activate
- to deactivate venv:
  $ deactivate

### Frontend

- to have the latest version of node: `npm install node --latest-npm`
- to install axios: `npm install axios`
- to develop in local environment: `npm run dev`
