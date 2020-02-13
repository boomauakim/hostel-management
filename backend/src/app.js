/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const body = require('./utils/body');
const logger = require('./utils/logger');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);
app.use((req, res) => {
  res.status(404).send(body.error('ENDPOINT_NOT_FOUND', 'Enpoint not found.'));
});
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(body.error(body.errorMsg.UNAUTHORIZED, 'Unauthorized.'));
  } else {
    logger.error(err.stack);
    res.status(500).send(body.error());
  }
  next();
});

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGO_URL, {
    auth: { authSource: 'admin' },
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
} else if (process.env.NODE_ENV === 'development') {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

mongoose.connection.on('connected', () => {
  logger.info('MongoDB Connected');
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  logger.error(`Failed to Connect MongoDB : ${err}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.error('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
  });
});

app.listen(process.env.PORT, () => {
  logger.info(`App is listening to port ${process.env.PORT}`);
});
