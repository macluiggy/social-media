# FROM node:18-alpine3.16
FROM node:22-alpine3.18
# FROM oven/bun


ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_EXPIRES_IN

RUN echo $DATABASE_URL
RUN echo $JWT_SECRET
RUN echo $JWT_EXPIRES_IN

ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRES_IN=$JWT_EXPIRES_IN

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

# RUN echo "DATABASE_URL=$DATABASE_URL" >

# ARG DATABASE_URL
# ARG JWT_SECRET
# ARG JWT_EXPIRES_IN

# # Set environment variables
# ENV DATABASE_URL='postgresql://postgres:fRGODMjpQZhlvLXRcHxTrduObsTDAYdF@viaduct.proxy.rlwy.net:46988/railway'
# ENV JWT_SECRET='secret'
# ENV JWT_EXPIRES_IN='1d'

ENV NODE_ENV=production
# Expose port 3000 
EXPOSE 3000
EXPOSE 4000

# Run the app
CMD ["npm", "run", "start:prod"]
# CMD ["bun", "run", "start:prod:bun"]