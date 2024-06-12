
NestJs Example using postgres database.

## Description

NestJs Example using postgres database and Typescript.

## Installation

```bash
$ npm install

$ npx migrate dev --name migrate_tables
```
next, create .env file:

then set variable "DATABASE_URL" and "JWT_SECRET"
  For example, 
  - DATABASE_URL="postgresql://postgres:@{HOST}:{PORT}/{DATABASE}?schema={SCHEMA}"
  - JWT_SECRET="Abcdefghijklmnopqrstuvwxyz"


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