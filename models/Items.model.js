const { Schema, model } = require("mongoose");

let itemsSchema = new Schema({
  name: String,
  category: String,
  description: String,
  qty: Number,
  unit: Number,
  dream: {
    type: Schema.Types.ObjectId,
    ref: "Dreams",
  },
});

const Items = model("Items", itemsSchema);

module.exports = Items;
