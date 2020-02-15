/* eslint-disable func-names, no-underscore-dangle, no-use-before-define */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const HostelSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  price: Number,
  images: Array,
  about: Object,
  amenities: Object,
  location: {
    gmap: {
      lat: Number,
      lng: Number
    },
    country: String,
    city: String
  }
});

HostelSchema.index({
  name: 'text',
  'location.country': 'text',
  'location.city': 'text'
});

HostelSchema.set('timestamps', true);
HostelSchema.set('toJSON', {
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

HostelSchema.pre('save', function(next) {
  const hostel = this;

  HostelModel.findOne({})
    .sort({ id: -1 })
    .exec((err, data) => {
      if (!data || !data.id) {
        hostel.id = 1;
        next();
      } else {
        hostel.id = data.id + 1;
        next();
      }
    });
});

const HostelModel = mongoose.model('Hostel', HostelSchema);

module.exports = HostelModel;
