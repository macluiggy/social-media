#!/bin/sh
set +a
npm install
npm run typeorm migration:run
npm run start:prod