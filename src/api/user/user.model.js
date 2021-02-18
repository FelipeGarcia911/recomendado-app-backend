/**
 * User model
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserProfileSchema = require('./user.profile.model');
const UserExperienceSchema = require('./user.experience.model');
const UserServiceSchema = require('./user.services.model');
const UserCommentSchema = require('./user.comment.model');

const { Schema } = mongoose;

const UserSchema = new Schema({
  profile: UserProfileSchema,
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
  experience: [{
    type: UserExperienceSchema,
    default: [],
  }],
  services: [{
    type: UserServiceSchema,
    default: [],
  }],
  comments: [{
    type: UserCommentSchema,
    default: [],
  }],
  created_at: { type: Date, default: Date.now },
});

/**
 * Virtuals
 */

// Public profile information
UserSchema.virtual('details').get(function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    profile: this.profile,
    services: this.services,
    comments: this.comments,
    experience: this.experience,
  };
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
