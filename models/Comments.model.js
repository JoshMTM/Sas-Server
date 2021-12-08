const { Schema, model } = require("mongoose");

let commentsSchema = new mongoose.Schema({
  text: { type: String, required: true },
  commentingUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  commentedDream: {
    type: Schema.Types.ObjectId,
    ref: "Dream",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Comments = model("Comments", commentsSchema);

module.exports = Comments;
