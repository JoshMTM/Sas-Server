const { Schema, model } = require("mongoose");

let dreamsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: string,
  image: String,
  items: {
    type: Schema.Types.ObjectId,
    ref: "Items",
  },
});

const Dreams = model("Dreams", dreamsSchema);

module.exports = Dreams;
