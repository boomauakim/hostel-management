/* eslint-disable no-underscore-dangle, func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: Object,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
});

UserSchema.set('timestamps', true);
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    const data = ret;
    data.id = ret._id;
    delete data._id;
    delete data.__v;
    return data;
  },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
