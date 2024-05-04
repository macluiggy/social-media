FROM node:22-alpine
# FROM node:22-alpine3.1
# FROM oven/bun


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

ENV NODE_ENV=production
# Expose port 3000 
EXPOSE 3000


ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_EXPIRES_IN

# RUN echo "DATABASE_URL=$DATABASE_URL" >
# RUN echo ${JWT_SECRET}
RUN echo $JWT_EXPIRES_IN

# RUN npm run start:prod

# CMD ["npm", "run", "start:prod"]