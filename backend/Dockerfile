# Install dependencies only when needed
FROM node:21.6-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

# Rebuild the source code only when needed
FROM node:21.6-alpine AS runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "./dist/http-server.js" ]