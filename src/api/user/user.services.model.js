const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserServicesSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  price: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
}, { _id: false });

module.exports = UserServicesSchema;
