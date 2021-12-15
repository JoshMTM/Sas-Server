const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  firstName: {
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
  lat: String,
  lon: String,
  addressline: String,
  zipCode: String,
  city: String,
  state: String,
  country: String,
  userDreams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dreams",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
