istrav-platform-backend
========

## Production
```bash
# firewall
$ sudo ufw allow 3000:65000/tcp
$ sudo ufw reload

# start
$ PORT=3000 pm2 start dist/main.js --update-env --name="communityfolder"

# stop
$ pm2 stop dist/main.js --name="communityfolder"

# logs
$ pm2 logs communityfolder

# delete
$ pm2 delete communityfolder

# list
$ pm2 status

# Generate Startup Script
$ pm2 startup

# Freeze your process list across server restart
$ pm2 save

# Remove Startup Script
$ pm2 unstartup

# after code change
$ pm2 reload all
```

## Installation

```bash
$ npm install
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