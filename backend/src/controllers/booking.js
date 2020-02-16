/* eslint-disable no-restricted-syntax, no-underscore-dangle  */
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const mongoose = require('mongoose');
const moment = require('moment');

const BookingModel = require('../models/booking');
const HostelModel = require('../models/hostel');
const ReservationModel = require('../models/reservation');
const UserModel = require('../models/user');
const body = require('../utils/body');
const logger = require('../utils/logger');

const createBooking = async (req, res) => {
  const { uid } = req.user;

  try {
    const schema = Joi.object({
      hostel_id: Joi.number().required(),
      check_in: Joi.date()
        .format('YYYY-MM-DD')
        .utc()
        .required(),
      check_out: Joi.date()
        .format('YYYY-MM-DD')
        .utc()
        .required(),
      guests: Joi.number().required()
    });
    const payload = await schema.validateAsync(req.body);

    try {
      const checkIn = payload.check_in;
      const checkOut = payload.check_out;

      let userResult = await UserModel.findOne({ _id: uid });
      if (!userResult) {
        return res
          .status(404)
          .send(body.error('USER_NOT_FOUND', 'User not found.'));
      }
      userResult = userResult.toObject();

      let hostelResult = await HostelModel.findOne({ id: payload.hostel_id });
      if (!hostelResult) {
        return res
          .status(404)
          .send(body.error('HOSTEL_NOT_FOUND', 'Hostel not found.'));
      }
      hostelResult = hostelResult.toObject();

      const reservationResult = await ReservationModel.findOne({
        date: {
          $gte: checkIn,
          $lte: checkOut
        },
        hostel: hostelResult._id
      });
      if (reservationResult) {
        return res
          .status(400)
          .send(
            body.error(
              'DATE_UNAVAILABLE',
              'Date between checkin and checkout has unavailable.'
            )
          );
      }

      const bookingData = {
        user: new mongoose.Types.ObjectId(uid),
        hostel: new mongoose.Types.ObjectId(hostelResult._id),
        date: moment().format('YYYY-MM-DD'),
        checkIn: moment(checkIn).format('YYYY-MM-DD'),
        checkOut: moment(checkOut).format('YYYY-MM-DD'),
        guests: payload.guests,
        status: 'confirm'
      };
      const booking = new BookingModel(bookingData);
      await booking.save().then(async () => {
        for (
          const current = moment(checkIn);
          current <= moment(checkOut);
          current.add(1, 'd')
        ) {
          const reservData = {
            hostel: new mongoose.Types.ObjectId(hostelResult._id),
            booking: booking._id,
            date: current.format('YYYY-MM-DD'),
            status: 'confirm'
          };
          const reservation = new ReservationModel(reservData);
          reservation.save();
        }
      });

      return res.status(201).send();
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

const getCalendar = async (req, res) => {
  try {
    const schema = Joi.object({
      hostel_id: Joi.number().required(),
      start_at: Joi.date()
        .format('YYYY-MM-DD')
        .utc()
        .required(),
      end_at: Joi.date()
        .format('YYYY-MM-DD')
        .utc()
        .required()
    });
    const payload = await schema.validateAsync(req.query);

    try {
      const startAt = payload.start_at;
      const endAt = payload.end_at;

      let hostelResult = await HostelModel.findOne({ id: payload.hostel_id });
      if (!hostelResult) {
        return res
          .status(404)
          .send(body.error('HOSTEL_NOT_FOUND', 'Hostel not found.'));
      }
      hostelResult = hostelResult.toObject();

      const reservationResult = await ReservationModel.find({
        date: {
          $gte: startAt,
          $lte: endAt
        },
        hostel: hostelResult._id
      }).select('date');

      const reserveDay = {};
      const calendar = [];
      for (const booking of reservationResult) {
        reserveDay[moment(booking.date).format('YYYY-MM-DD')] = 'reserved';
      }

      for (
        const current = moment(startAt);
        current <= moment(endAt);
        current.add(1, 'd')
      ) {
        const currentDate = moment(current).format('YYYY-MM-DD');
        let available = true;
        if (reserveDay[currentDate]) {
          available = false;
        }

        calendar.push({
          date: moment(current).format('YYYY-MM-DD'),
          available
        });
      }

      return res.status(201).send(body.success('calendar', calendar));
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

module.exports = { createBooking, getCalendar };
