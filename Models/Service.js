const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  icon: {
    required: true,
    type: String,
    trim: true,
  },
  description: {
    required: true,
    type: String,
    minlength: 50,
    trim: true,
  },
  showcase: {
    type: Schema.Types.ObjectId,
    ref: "Showcase",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Service = model("Service", ServiceSchema);

module.exports = Service;
