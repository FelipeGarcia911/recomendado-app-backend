const mongoose = require("mongoose")

const { Schema } = mongoose

const UserCommentSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    rating: {
      type: Number,
      default: 3,
      minValue: 0,
      maxValue: 5,
    },
    created_at: { type: Date, default: Date.now },
  },
  { _id: false }
)

module.exports = UserCommentSchema
