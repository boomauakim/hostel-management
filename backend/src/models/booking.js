/* eslint-disable func-names, no-underscore-dangle, no-use-before-define */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookingSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  date: Date,
  checkIn: Date,
  checkOut: Date,
  status: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hostel: {
    type: Schema.Types.ObjectId,
    ref: 'Hostel',
  },
});

BookingSchema.set('timestamps', true);
BookingSchema.set('toJSON', {
  transform: (doc, ret) => {
    const data = ret;
    data.check_in = ret.checkIn;
    data.check_out = ret.checkOut;
    data.created_at = ret.createdAt;
    data.updated_at = ret.updatedAt;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.checkIn;
    delete data.checkOut;
    delete data._id;
    delete data.__v;
    return data;
  },
});

BookingSchema.pre('save', function (next) {
  const booking = this;

  BookingModel.findOne({})
    .sort({ id: -1 })
    .exec((err, data) => {
      if (!data || !data.id) {
        booking.id = 1;
        next();
      } else {
        booking.id = data.id + 1;
        next();
      }
    });
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;
