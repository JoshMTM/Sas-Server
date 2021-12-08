const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  firsName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  userDreams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dreams",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
