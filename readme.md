# How to use

## Locally

### Install dependencies

    npm i

### Build project for serve in server

    npm run build

### Build and run

    npm run build:start

### Run in development stage

    npm run dev

## Docker

### Create image

    docker build -t ntd-impl .

### Build and run container

    docker container run -d -p 4000:3120 ntd-impl
