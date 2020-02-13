/* eslint-disable no-underscore-dangle */
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');
const body = require('../utils/body');
const logger = require('../utils/logger');

const login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const payload = await schema.validateAsync(req.body);

    try {
      const user = await UserModel.findOne({ email: payload.email });
      if (!user) {
        return res.status(401).send(body.error('UNAUTHORIZED', 'Email or Password is incorrect.'));
      }

      const validate = await user.isValidPassword(payload.password);
      if (!validate) {
        return res.status(401).send(body.error('UNAUTHORIZED', 'Email or Password is incorrect.'));
      }

      const token = jwt.sign({ uid: user.toObject()._id }, process.env.SECRET_KEY);

      return res.status(200).send({ access_token: token });
    } catch (err) {
      logger.error(err.stack);
      return res.status(500).send(body.error());
    }
  } catch (err) {
    if (err.details) {
      const { message } = err.details[0];
      return res.status(400).send(body.error(body.errorMsg.INVALID_PARAMETER, message));
    }
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

const signUp = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      birthDate: Joi.string().required(),
    });
    const payload = await schema.validateAsync(req.body);

    try {
      const user = new UserModel(payload);
      await user.save();
      return res.status(201).send();
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).send(body.error('DUPLICATE_EMAIL', 'Email is duplicate.'));
      }
      logger.error(err.stack);
      return res.status(500).send(body.error());
    }
  } catch (err) {
    if (err.details) {
      const { message } = err.details[0];
      return res.status(400).send(body.error(body.errorMsg.INVALID_PARAMETER, message));
    }
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

module.exports = { login, signUp };
