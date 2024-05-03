FROM node:18-alpine3.16
# FROM node:22-alpine3.1
# FROM oven/bun


# ARG DATABASE_URL
# ARG JWT_SECRET
# ARG JWT_EXPIRES_IN

# RUN echo $DATABASE_URL
# RUN echo $JWT_SECRET
# RUN echo $JWT_EXPIRES_IN

# ENV DATABASE_URL=${DATABASE_URL}
# ENV JWT_SECRET=${JWT_SECRET}
# ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./

# Bundle app source
COPY . .

# RUN bun install -g @nestjs/cli
# RUN bun install
# RUN bun run build

RUN npm install -g @nestjs/cli
RUN npm install --omit=dev




RUN npm run build


# railway env variables
ARG RAILWAY_PUBLIC_DOMAIN
ARG RAILWAY_PRIVATE_DOMAIN
ARG RAILWAY_PROJECT_NAME
ARG RAILWAY_ENVIRONMENT_NAME
ARG RAILWAY_SERVICE_NAME
ARG RAILWAY_PROJECT_ID
ARG RAILWAY_ENVIRONMENT_ID
ARG RAILWAY_SERVICE_ID
# app env variables
ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_EXPIRES_IN

# ENV DATABASE_URL=$DATABASE_URL \
#   JWT_SECRET=$JWT_SECRET \
#   JWT_EXPIRES_IN=$JWT_EXPIRES_IN \
#   RAILWAY_PUBLIC_DOMAIN=$RAILWAY_PUBLIC_DOMAIN \
#   RAILWAY_PRIVATE_DOMAIN=$RAILWAY_PRIVATE_DOMAIN \
#   RAILWAY_PROJECT_NAME=$RAILWAY_PROJECT_NAME \
#   RAILWAY_ENVIRONMENT_NAME=$RAILWAY_ENVIRONMENT_NAME \
#   RAILWAY_SERVICE_NAME=$RAILWAY_SERVICE_NAME \
#   RAILWAY_PROJECT_ID=$RAILWAY_PROJECT_ID \
#   RAILWAY_ENVIRONMENT_ID=$RAILWAY_ENVIRONMENT_ID \
#   RAILWAY_SERVICE_ID=$RAILWAY_SERVICE_ID

# RUN npm run typeorm:run-migrations

# RUN echo "DATABASE_URL=$DATABASE_URL" >

# ARG DATABASE_URL
# ARG JWT_SECRET
# ARG JWT_EXPIRES_IN

# Set environment variables
# ENV DATABASE_URL='postgresql://postgres:fRGODMjpQZhlvLXRcHxTrduObsTDAYdF@viaduct.proxy.rlwy.net:46988/railway'
# ENV JWT_SECRET='secret'
# ENV JWT_EXPIRES_IN='1d'


ENV NODE_ENV=production
# Expose port 3000 
EXPOSE 3000

# Run the app
# COPY start.sh .
# RUN chmod +x start.sh
# CMD ["./start.sh"]

# CMD ["npm", "run", "typeorm:run-migrations", "&&", "npm", "run", "start:prod:bun"]
CMD ["npm", "run", "start:prod"]
# CMD ["bun", "run", "start:prod:bun"]