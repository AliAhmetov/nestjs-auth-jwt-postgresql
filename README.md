<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Create **.dev.env** file for environment variables\
PORT=_port_\
POSTGRES_HOST=_localhost_\
POSTGRES_USER=_username_\
POSTGRES_DB=_dbname_\
POSTGRES_PASSWORD=_password_\
POSTGRES_PORT=_5432_\
SECRET_KEY=_YOUR_SECRET_KEY_\
And **.prod.env** for production environment variables
## Installation

```bash
$ npm install
```

## Running the app

```bash

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
