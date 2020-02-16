FROM keymetrics/pm2:latest-slim

COPY src src/
COPY package.json .
COPY pm2.json .

ARG SECRET_KEY
ARG MONGO_URL
ARG PORT

ENV SECRET_KEY $SECRET_KEY
ENV MONGO_URL $MONGO_URL
ENV PORT $PORT
ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install --production

EXPOSE 3030

CMD [ "pm2-runtime", "start", "pm2.json" ]
