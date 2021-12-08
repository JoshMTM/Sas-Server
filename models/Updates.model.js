const { Schema, model } = require("mongoose");

let UpdatesSchema = new Schema({
  description: { type: String, required: true },
  image: String,
  updatingUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  //Which dream does the comment belongs to??
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
  likes: Number,
});

const Updates = model("Updates", UpdatesSchema);

module.exports = Updates;
