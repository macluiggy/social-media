# FROM node:18-alpine3.16
FROM oven/bun

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./

# Bundle app source
COPY . .

RUN bun install -g @nestjs/cli
RUN bun install
RUN bun run build

# RUN npm install -g @nestjs/cli
# RUN npm install --omit=dev
# RUN npm run build

ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_EXPIRES_IN

# Set environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRES_IN=$JWT_EXPIRES_IN

ENV NODE_ENV=production
# Expose port 3000 
EXPOSE 3000

# Run the app
# CMD ["npm", "run", "start:prod"]
CMD ["bun", "run", "start:prod:bun"]