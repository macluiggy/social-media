FROM node:18-alpine3.16
# FROM node:22-alpine3.1
# FROM oven/bun


ARG RAILWAY_ENVIRONMENT_NAME
ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_EXPIRES_IN
ARG RAILWAY_DOCKERFILE_PATH
ARG HOLA

RUN echo "THES IS THE RAILWAY_ENVIRONMENT_NAME"
RUN echo $RAILWAY_ENVIRONMENT_NAME
RUN echo "Database URL: $DATABASE_URL"
RUN echo $JWT_SECRET
RUN echo $JWT_EXPIRES_IN
RUN echo $RAILWAY_DOCKERFILE_PATH
RUN echo $HOLA

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./

# Bundle app source
COPY . .

RUN npm install -g @nestjs/cli
RUN npm install --omit=dev
RUN npm run build
# Expose port 3000 
EXPOSE 3000


# RUN npm run start:prod
CMD ["npm", "run", "start:prod"]