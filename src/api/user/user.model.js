/**
 * user model
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserProfileSchema = require('./user.profile.model');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: UserProfileSchema,
});

/**
 * Virtuals
 */

// Public profile information
UserSchema.virtual('details').get(function () {
  return { _id: this._id, name: this.name, email: this.email, profile: this.profile };
});

/**
 * Methods
 */

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(`${password}`, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password) || false;
  return result;
};

module.exports = mongoose.model('User', UserSchema);
