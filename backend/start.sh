#!/bin/sh
set -a
. ./.env
set +a
npm run typeorm migration:run
npm run start:prod