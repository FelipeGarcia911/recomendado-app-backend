const mongoose = require("mongoose")

const { Schema } = mongoose

const UserProfileSchema = new Schema(
  {
    description: { type: String, default: "" },
    phone: { type: String, default: "" },
    picture: { type: String, lowercase: true, default: "" },
    rating: {
      type: Number,
      default: 3,
      minValue: 0,
      maxValue: 5,
    },
    location: {
      address: { type: String, default: "" },
      country: { type: String, default: "" },
      state: { type: String, default: "" },
      city: { type: String, default: "" },
    },
    social_networks: {
      facebook: { type: String, default: "", lowercase: true },
      twitter: { type: String, default: "", lowercase: true },
      linkedin: { type: String, default: "", lowercase: true },
      instagram: { type: String, default: "", lowercase: true },
    },
  },
  { _id: false }
)

module.exports = UserProfileSchema
