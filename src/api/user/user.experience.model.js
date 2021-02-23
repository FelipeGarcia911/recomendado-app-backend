const mongoose = require("mongoose")

const { Schema } = mongoose

const UserExperienceSchema = new Schema(
  {
    job: { type: String, default: "" },
    company: { type: String, default: "" },
    description: { type: String, default: "" },
    startDate: { type: Date, default: "" },
    endDate: { type: Date, default: "" },
    created_at: { type: Date, default: Date.now },
  },
  { _id: false }
)

module.exports = UserExperienceSchema
