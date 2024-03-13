[![unit-tests](https://github.com/SkinSightYnov/backend/actions/workflows/test.yml/badge.svg)](https://github.com/SkinSightYnov/backend/actions/workflows/test.yml)
[![CodeQL](https://github.com/SkinSightYnov/backend/actions/workflows/codeql.yml/badge.svg)](https://github.com/SkinSightYnov/backend/actions/workflows/codeql.yml)
[![Docker Image Build](https://github.com/SkinSightYnov/backend/actions/workflows/image.yml/badge.svg)](https://github.com/SkinSightYnov/backend/actions/workflows/image.yml)
[![Snyk Security Scan](https://github.com/SkinSightYnov/backend/actions/workflows/snyk.yml/badge.svg)](https://github.com/SkinSightYnov/backend/actions/workflows/snyk.yml)


## Description

...

## Installation

```bash
$ npm install
```

### Génération de types ( lié à Prisma )

```bash
$ npx prisma generate
```

### Migration de la base ( dev )

```bash
$ npx prisma migrate dev
```

## Running the app

```bash
# development
$ npm run start

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

## génération de la documentation technique

```bash

$ npx @compodoc/compodoc -p tsconfig.json -s

```

ensuite la documentation est disponible sur le port 8080
