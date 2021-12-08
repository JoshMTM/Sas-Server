const { Schema, model } = require("mongoose");

let UpdatesSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image: String,
  updatingUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updatedDream: {
    type: Schema.Types.ObjectId,
    ref: "Dream",
  },
  date: {
    type: Date,
    required: true,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
  },
});

const Updates = model("Updates", UpdatesSchema);

module.exports = Updates;
