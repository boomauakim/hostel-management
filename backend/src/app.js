const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);
app.use((req, res) => {
  res.status(404).send({
    errors: {
      code: 'ENDPOINT_NOT_FOUND',
      message: 'Endpoint not found.',
    },
  });
});
app.use((err, req, res) => {
  res.status(500).send({
    errors: {
      code: 'INTERNAL_ERROR',
      message: 'Sorry, Something went wrong.',
    },
  });
});

app.listen(3030);
