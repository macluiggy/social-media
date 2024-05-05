FROM oven/bun


ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_EXPIRES_IN

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


ENV NODE_ENV=production
# Expose port 3000 
EXPOSE 3000

CMD ["bun", "run", "start:prod:bun"]