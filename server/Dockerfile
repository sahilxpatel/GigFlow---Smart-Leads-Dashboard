FROM node:20-alpine AS builder
WORKDIR /app

COPY server/package.json ./server/package.json
COPY tsconfig.base.json ./tsconfig.base.json
WORKDIR /app/server
RUN npm install
COPY server/src ./src
COPY server/tsconfig.json ./tsconfig.json
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

WORKDIR /app/server
COPY server/package.json ./package.json
RUN npm install --omit=dev
COPY --from=builder /app/server/dist ./dist

EXPOSE 5000
CMD ["node", "dist/server.js"]
