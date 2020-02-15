/* eslint-disable no-underscore-dangle */
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const BookingModel = require('../models/booking');
const body = require('../utils/body');
const logger = require('../utils/logger');

const getBooking = async (req, res) => {
  const host = `${req.protocol}://${req.get('host')}`;
  const { uid } = req.user;

  try {
    const schema = Joi.object({
      before: Joi.string().length(24),
      after: Joi.string().length(24),
      limit: Joi.number().default(10)
    });
    const query = await schema.validateAsync(req.query);

    try {
      let data = [];

      if (query.before && query.after) {
        return res
          .status(400)
          .send(
            body.error(
              body.errorMsg.INVALID_PARAMETER,
              'Must choose one of before or after.'
            )
          );
      }
      if (query.before) {
        data = await BookingModel.find({
          user: uid,
          _id: {
            $lt: new mongoose.Types.ObjectId(query.before)
          }
        })
          .select('-user')
          .populate({ path: 'hostel', select: 'name location images' })
          .sort({ id: 1 })
          .limit(parseInt(query.limit, 10));
      } else if (query.after) {
        data = await BookingModel.find({
          user: uid,
          _id: {
            $gt: new mongoose.Types.ObjectId(query.after)
          }
        })
          .select('-user')
          .populate({ path: 'hostel', select: 'name location images' })
          .sort({ id: 1 })
          .limit(parseInt(query.limit, 10));
      } else {
        data = await BookingModel.find({
          user: uid
        })
          .select('-user')
          .populate({ path: 'hostel', select: 'name location images' })
          .sort({ id: 1 })
          .limit(parseInt(query.limit, 10));
      }

      const first = await BookingModel.findOne({ user: uid })
        .sort({ id: 1 })
        .limit(1);
      const last = await BookingModel.findOne({ user: uid })
        .sort({ id: -1 })
        .limit(1);
      let next = '';
      let previous = '';

      if (data.length > 0 && data[0] && !first._id.equals(data[0]._id)) {
        previous = `${host}/api/me/bookings?before=${data[0]._id}&limit=${query.limit}`;
      }
      if (
        data.length > 0 &&
        data[data.length - 1] &&
        !last._id.equals(data[data.length - 1]._id)
      ) {
        next = `${host}/api/me/bookings?after=${
          data[data.length - 1]._id
        }&limit=${query.limit}`;
      }

      const resData = {
        bookings: data,
        paging: {
          previous,
          next
        }
      };

      return res.status(200).send(resData);
    } catch (err) {
      logger.error(err.stack);
      return res.status(500).send(body.error());
    }
  } catch (err) {
    if (err.details) {
      const { message } = err.details[0];
      return res
        .status(400)
        .send(body.error(body.errorMsg.INVALID_PARAMETER, message));
    }
    logger.error(err.stack);
    return res.status(500).send(body.error());
  }
};

module.exports = { getBooking };
