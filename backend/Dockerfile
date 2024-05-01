FROM node:18-alpine3.16
# FROM oven/bun

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./

# RUN bun install -g @nestjs/cli
# RUN bun install
RUN npm install -g @nestjs/cli
RUN npm install --omit=dev
RUN npm run build

# Bundle app source
COPY . .

# Expose port 3000 
EXPOSE 4000

# Run the app
CMD ["npm", "run", "start:prod"]
# CMD ["bun", "run", "start:dev"]