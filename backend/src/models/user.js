/* eslint-disable func-names, no-underscore-dangle, no-use-before-define */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = require('mongoose');

const UserSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  firstName: String,
  lastName: String,
  birthDate: String,
});

UserSchema.set('timestamps', true);
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    const data = ret;
    data.created_at = ret.createdAt;
    data.updated_at = ret.updatedAt;
    delete data.createdAt;
    delete data.updatedAt;
    delete data._id;
    delete data.__v;
    delete data.password;
    return data;
  },
});

UserSchema.pre('save', function (next) {
  const user = this;

  UserModel.findOne({})
    .sort({ user: -1 })
    .exec(async (err, data) => {
      const hash = await bcrypt.hash(user.password, 10);
      if (!data || !data.id) {
        user.id = 1;
        user.password = hash;
        next();
      } else {
        user.id = data.id + 1;
        user.password = hash;
        next();
      }
    });
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
