FROM node:13.6-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run --production build

FROM nginx:1.16-alpine
COPY --from=builder /app/build /usr/share/nginx/html
