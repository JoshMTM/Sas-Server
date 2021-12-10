const { Schema, model } = require("mongoose");
const Items = require("./Items.model");
const Users = require("./User.model");
const Comments = require("./Comments.model");

let UpdatesSchema = new Schema({
  message: { type: String, required: true },
  description: String,
  image: String,
  updatingUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  //Which dream does the comment belongs to??
  updatedDream: {
    type: Schema.Types.ObjectId,
    ref: "Dreams",
  },
  image: String,
  date: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  likes: Number,
});

const Updates = model("Updates", UpdatesSchema);

module.exports = Updates;
