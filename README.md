# Commission calculator

Rest api for transaction processing and commission calculation, written in nest.js

# Setup

* Copy/rename `env.example` file to `.env`
* Copy/rename `docker-compose.override.yml.example` file to `docker-compose.override.yml`
* Run `docker-compose up -d`
* Run `docker-compose restart`
* Run `docker-compose exec commission-service npm run migration:run`

# API
* `POST /` - transaction processing and commission calculation EP

# Swagger 
* http://localhost/api
  ![image info](docs/swagger.png)

# Tests:
* Run `docker-compose exec commission-service npm run test`

## Core libs

### Usage of Big (floating point problems)
To solve the issue of floating point arithmetics, all numbers are converted into instances of `Big`, and all mathematics operations
are done by Big API.

## Known problems

## Unsolved due to time limitation
