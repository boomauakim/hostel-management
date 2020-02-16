FROM node:13.6-alpine AS builder

WORKDIR /app

COPY . .

ARG REACT_APP_API_ENDPOINT
ARG REACT_APP_GOOGLE_MAP_KEY

ENV REACT_APP_API_ENDPOINT $REACT_APP_API_ENDPOINT
ENV REACT_APP_GOOGLE_MAP_KEY $REACT_APP_GOOGLE_MAP_KEY

RUN yarn install
RUN yarn run --production build

FROM nginx:1.16-alpine
COPY --from=builder /app/build /usr/share/nginx/html
