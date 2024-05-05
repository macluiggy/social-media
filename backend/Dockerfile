FROM node:18-alpine3.16
# FROM node:22-alpine3.1
# FROM oven/bun



ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_EXPIRES_IN

# ENV DATABASE_URL=$DATABASE_URL
# ENV JWT_SECRET=$JWT_SECRET
# ENV JWT_EXPIRES_IN=$JWT_EXPIRES_IN

RUN echo $DATABASE_URL
RUN echo $JWT_SECRET
RUN echo $JWT_EXPIRES_IN

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