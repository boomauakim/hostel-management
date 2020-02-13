/* eslint-disable no-underscore-dangle */
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const mongoose = require('mongoose');
const moment = require('moment');

const HostelModel = require('../models/hostel');
const ReservationModel = require('../models/reservation');
const body = require('../utils/body');
const logger = require('../utils/logger');

const TOPIC = 'hostels';

const getAllHostel = async (req, res) => {
  const host = req.get('host');

  try {
    const schema = Joi.object({
      before: Joi.string().length(24),
      after: Joi.string().length(24),
      limit: Joi.number().default(10),
    });
    const query = await schema.validateAsync(req.query);

    try {
      let data = [];

      if (query.before && query.after) {
        return res.status(400).send(body.error(body.errorMsg.INVALID_PARAMETER, 'Must choose one of before or after.'));
      }
      if (query.before) {
        data = await HostelModel
          .find({
            _id: {
              $lt: new mongoose.Types.ObjectId(query.before),
            },
          })
          .sort({ id: -1 })
          .limit(parseInt(query.limit, 10));
      } else if (query.after) {
        data = await HostelModel
          .find({
            _id: {
              $gt: new mongoose.Types.ObjectId(query.after),
            },
          })
          .sort({ id: 1 })
          .limit(parseInt(query.limit, 10));
      } else {
        data = await HostelModel
          .find()
          .sort({ id: 1 })
          .limit(parseInt(query.limit, 10));
      }

      const first = await HostelModel.findOne().sort({ id: 1 }).limit(1);
      const last = await HostelModel.findOne().sort({ id: -1 }).limit(1);
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
      return res.status(400).send(body.error(body.errorMsg.INVALID_PARAMETER, message));
    }
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

const getHostel = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await HostelModel.findOne({ id });

    if (data) {
      return res.status(200).send(body.success(TOPIC, data));
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
      const hostel = new HostelModel(payload);
      await hostel.save();
      return res.status(201).send();
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

const searchHotel = async (req, res) => {
  const { query } = req.query;

  try {
    const data = await HostelModel.find({ $text: { $search: query } }, 'id name location.country location.city');

    if (Object.entries(data).length !== 0) {
      return res.status(200).send(body.success(TOPIC, data));
    }
    return res.status(200).send(body.success(TOPIC, []));
  } catch (err) {
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

const getHostelAvailable = async (req, res) => {
  const host = req.get('host');

  try {
    const schema = Joi.object({
      before: Joi.string().length(24),
      after: Joi.string().length(24),
      limit: Joi.number().default(10),
      start_at: Joi.date().format('YYYY-MM-DD').utc().required(),
      end_at: Joi.date().format('YYYY-MM-DD').utc().required(),
    });
    const query = await schema.validateAsync(req.query);

    try {
      const hostelUnavailable = await ReservationModel.find(
        {
          date: {
            $gte: query.start_at,
            $lte: query.end_at,
          },
        },
      )
        .distinct('hostel');

      let data = [];

      if (query.before && query.after) {
        return res.status(400).send(body.error(body.errorMsg.INVALID_PARAMETER, 'Must choose one of before or after.'));
      }
      if (query.before) {
        data = await HostelModel
          .find({
            _id: {
              $lt: new mongoose.Types.ObjectId(query.before),
              $nin: hostelUnavailable,
            },
          })
          .sort({ id: -1 })
          .limit(parseInt(query.limit, 10));
      } else if (query.after) {
        data = await HostelModel
          .find({
            _id: {
              $gt: new mongoose.Types.ObjectId(query.after),
              $nin: hostelUnavailable,
            },
          })
          .sort({ id: 1 })
          .limit(parseInt(query.limit, 10));
      } else {
        data = await HostelModel
          .find({ _id: { $nin: hostelUnavailable } })
          .sort({ id: 1 })
          .limit(parseInt(query.limit, 10));
      }

      const first = await HostelModel.findOne({ _id: { $nin: hostelUnavailable } }).sort({ id: 1 }).limit(1);
      const last = await HostelModel.findOne({ _id: { $nin: hostelUnavailable } }).sort({ id: -1 }).limit(1);
      let next = '';
      let previous = '';

      if (data.length > 0 && data[0] && !first._id.equals(data[0]._id)) {
        previous = `${host}/api/hostels/available?before=${data[0]._id}&limit=${query.limit}&start_at=${moment(query.start_at).format('YYYY-MM-DD')}&end_at=${moment(query.end_at).format('YYYY-MM-DD')}`;
      }
      if (data.length > 0 && data[data.length - 1] && !last._id.equals(data[data.length - 1]._id)) {
        next = `${host}/api/hostels/available?after=${data[data.length - 1]._id}&limit=${query.limit}&start_at=${moment(query.start_at).format('YYYY-MM-DD')}&end_at=${moment(query.end_at).format('YYYY-MM-DD')}`;
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
      return res.status(400).send(body.error(body.errorMsg.INVALID_PARAMETER, message));
    }
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

module.exports = {
  getAllHostel, getHostel, getHostelAvailable, createHostel, searchHotel,
};
