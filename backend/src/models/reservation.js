/* eslint-disable func-names, no-underscore-dangle, no-use-before-define */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReservationSchema = new Schema({
  hostel: {
    type: Schema.Types.ObjectId,
    ref: 'Hostel'
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  },
  date: Date,
  status: String
});

ReservationSchema.set('timestamps', true);
ReservationSchema.set('toJSON', {
  transform: (doc, ret) => {
    const data = ret;
    data.created_at = ret.createdAt;
    data.updated_at = ret.updatedAt;
    delete data.createdAt;
    delete data.updatedAt;
    delete data._id;
    delete data.__v;
    return data;
  }
});

ReservationSchema.pre('save', async function(next) {
  const reservation = this;

  await ReservationModel.findOne({})
    .sort({ id: -1 })
    .exec((err, data) => {
      if (!data || !data.id) {
        reservation.id = 1;
        next();
      } else {
        reservation.id = data.id + 1;
        next();
      }
    });
});

const ReservationModel = mongoose.model('Reservation', ReservationSchema);

module.exports = ReservationModel;
