FROM node:20-alpine AS builder
WORKDIR /app

COPY client/package.json ./client/package.json
COPY tsconfig.base.json ./tsconfig.base.json
WORKDIR /app/client
RUN npm install

COPY client/public ./public
COPY client/index.html ./index.html
COPY client/tsconfig*.json client/vite.config.ts client/tailwind.config.ts client/postcss.config.js ./
COPY client/src ./src
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
