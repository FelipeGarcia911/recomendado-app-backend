const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserProfileSchema = new Schema({
  address: { type: String, uppercase: true },
  city: { type: String, default: 'MEDELLIN', uppercase: true },
  country: { type: String, default: 'COLOMBIA', uppercase: true },
  facebook: { type: String, default: '' },
  github: { type: String, default: '' },
  language: { type: String, default: 'ES', uppercase: true },
  phoneNumber: { type: String, default: '' },
  picture: { type: String, lowercase: true, default: '' },
  timeZone: { type: String, default: 'America/Bogota' },
  twitter: { type: String, default: '' },
}, { _id: false });

module.exports = UserProfileSchema;
