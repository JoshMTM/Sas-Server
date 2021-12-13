const { Schema, model } = require("mongoose");
const Users = require("./User.model");
const Comments = require("./Comments.model");
const Dreams = require("./Dreams.model");

let UpdatesSchema = new Schema({
  name: String,
  message: { type: String },
  description: String,
  image: String,
  updatingUser: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  date: String,

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
