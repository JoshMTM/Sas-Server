const { Schema, model } = require("mongoose");
const Items = require("./Items.model");
const Users = require("./User.model");

let dreamsSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  date: String,
  image: String,
  date: String,
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Items",
    },
  ],
  dreamer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Dreams = model("Dreams", dreamsSchema);

module.exports = Dreams;
