const { Schema, model } = require("mongoose");

let dreamsSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  date: String,
  image: String,
  date: String,
  items: {
    type: Schema.Types.ObjectId,
    ref: "Items",
  },
  dreamer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Dreams = model("Dreams", dreamsSchema);

module.exports = Dreams;
