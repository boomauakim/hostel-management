FROM keymetrics/pm2:latest-slim

COPY src src/
COPY package.json .
COPY pm2.json .

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

CMD [ "pm2-runtime", "start", "pm2.json" ]
