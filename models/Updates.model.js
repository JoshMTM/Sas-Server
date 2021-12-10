const { Schema, model } = require("mongoose");

let UpdatesSchema = new Schema({
  message: { type: String, required: true },
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
  image: String,
  date: {
    type: String,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
  },
  likes: Number,
});

const Updates = model("Updates", UpdatesSchema);

module.exports = Updates;
