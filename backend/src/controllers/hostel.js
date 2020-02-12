/* eslint-disable no-underscore-dangle */
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Hostel = require('../models/hostel');
const body = require('../utils/body');
const logger = require('../utils/logger');

const { code } = body;

const getAllHostel = async (req, res) => {
  const host = req.get('host');

  const schema = Joi.object({
    before: Joi.string().length(24),
    after: Joi.string().length(24),
    limit: Joi.number().default(10),
  });

  try {
    const query = await schema.validateAsync(req.query);

    try {
      let data = [];

      if (query.before && query.after) {
        return res.status(400).send(body.error(code.INVALID_PARAMETER, 'Must choose one of before or after.'));
      }
      if (query.before) {
        data = await Hostel
          .find({
            _id: {
              $lt: new mongoose.Types.ObjectId(query.before),
            },
          })
          .sort({ roomId: 1 })
          .limit(parseInt(query.limit, 10));
      } else if (query.after) {
        data = await Hostel
          .find({
            _id: {
              $gt: new mongoose.Types.ObjectId(query.after),
            },
          })
          .sort({ roomId: 1 })
          .limit(parseInt(query.limit, 10));
      } else {
        data = await Hostel
          .find()
          .sort({ roomId: 1 })
          .limit(parseInt(query.limit, 10));
      }

      const first = await Hostel.findOne().sort({ roomId: 1 }).limit(1);
      const last = await Hostel.findOne().sort({ roomId: -1 }).limit(1);
      let next = '';
      let previous = '';

      if (data.length > 0 && data[0] && !first._id.equals(data[0]._id)) {
        previous = `${host}/api/hostels?before=${data[0]._id}&limit=${query.limit}`;
      }
      if (data.length > 0 && data[data.length - 1] && !last._id.equals(data[data.length - 1]._id)) {
        next = `${host}/api/hostels?after=${data[data.length - 1]._id}&limit=${query.limit}`;
      }

      const resData = {
        hostels: data,
        paging: {
          previous,
          next,
        },
      };

      return res.status(200).send(resData);
    } catch (err) {
      logger.error(err.stack);
      return res.status(500).send(body.error());
    }
  } catch (err) {
    if (err.details) {
      const { message } = err.details[0];
      return res.status(400).send(body.error(code.INVALID_PARAMETER, message));
    }
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

const getHostel = async (req, res) => {
  const { roomId } = req.params;

  try {
    const data = await Hostel.findOne({ roomId });

    if (data) {
      return res.status(200).send(body.success('hostels', data));
    }
    return res.status(404).send(body.error('HOSTEL_NOT_FOUND', 'Hostel not found.'));
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

const createHostel = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      images: Joi.array().items(Joi.string()).required(),
      about: Joi.object({
        detail: Joi.string().required(),
        space: Joi.string().required(),
        guest: Joi.string().required(),
        other: Joi.string().required(),
      }).required(),
      amenities: Joi.object({
        wifi: Joi.boolean(),
        tv: Joi.boolean(),
        pool: Joi.boolean(),
        kitchen: Joi.boolean(),
        parking: Joi.boolean(),
        elevator: Joi.boolean(),
      }).required(),
      location: Joi.object({
        gmap: Joi.object({
          lat: Joi.number().required(),
          lng: Joi.number().required(),
        }).required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
      }).required(),
      guest: Joi.number().required(),
      room: Joi.object({
        bedroom: Joi.number().required(),
        bathroom: Joi.number().required(),
        kitchen: Joi.number().required(),
      }).required(),
    });

    const payload = await schema.validateAsync(req.body);

    try {
      const hostel = new Hostel(payload);
      await hostel.save().catch((err) => { throw err; });
      return res.status(201).send();
    } catch (err) {
      logger.error(err.stack);
      return res.status(500).send(body.error());
    }
  } catch (err) {
    if (err.details) {
      const { message } = err.details[0];
      return res.status(400).send(body.error(code.INVALID_PARAMETER, message));
    }
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

const searchHotel = async (req, res) => {
  const { query } = req.query;

  try {
    const data = await Hostel.find({ $text: { $search: query } }, 'roomId name location.country location.city');

    if (Object.entries(data).length !== 0) {
      return res.status(200).send(body.success('hostels', data));
    }
    return res.status(200).send(body.success('hostels', []));
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

module.exports = {
  getAllHostel, getHostel, createHostel, searchHotel,
};
