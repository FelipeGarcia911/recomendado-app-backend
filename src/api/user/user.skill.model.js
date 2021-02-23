const mongoose = require("mongoose")

const { Schema } = mongoose

const UserSkillModel = new Schema(
  {
    title: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
  },
  { _id: false }
)

module.exports = UserSkillModel
