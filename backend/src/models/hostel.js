/* eslint-disable no-underscore-dangle, no-use-before-define, func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const HostelSchema = new Schema({
  roomId: Number,
  name: String,
  price: Number,
  images: Array,
  about: Object,
  amenities: Object,
  location: {
    gmap: {
      lat: Number,
      lng: Number,
    },
    country: String,
    city: String,
  },
  guest: Number,
  room: Object,
});

HostelSchema.index({ name: 'text', 'location.country': 'text', 'location.city': 'text' });

HostelSchema.set('timestamps', true);
HostelSchema.set('toJSON', {
  transform: (doc, ret) => {
    const data = ret;
    data.id = ret._id;
    delete data._id;
    delete data.__v;
    return data;
  },
});

HostelSchema.pre('save', function (next) {
  const self = this;
  HostelModel.findOne({})
    .sort({ roomId: -1 })
    .exec((err, data) => {
      if (!data || !data.roomId) {
        self.roomId = 1;
        next();
      } else {
        self.roomId = data.roomId + 1;
        next();
      }
    });
});

const HostelModel = mongoose.model('Hostel', HostelSchema);

module.exports = HostelModel;
