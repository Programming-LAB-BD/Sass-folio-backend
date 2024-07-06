const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  username: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
  },
  showcase: {
    type: Schema.Types.ObjectId,
    ref: "Showcase",
  },
});

const User = model("User", UserSchema);

module.exports = User;
