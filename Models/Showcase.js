const { model, Schema } = require("mongoose");

const ShowcaseSchema = new Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  title: {
    required: true,
    type: String,
    maxlength: 30,
    trim: true,
  },
  description: {
    required: true,
    type: String,
    maxlength: 500,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
    default: "",
  },
  picture: {
    type: String,
    trim: true,
    default: "",
  },
  introduction: {
    required: true,
    type: String,
    minlength: 200,
    maxlength: 1000,
    trim: true,
  },
  socialLink: [
    {
      icon: {
        required: true,
        type: String,
        trim: true,
      },
      link: {
        required: true,
        type: String,
        trim: true,
      },
    },
  ],
  aboutText: {
    required: true,
    type: String,
    minlength: 700,
    trim: true,
  },
  skills: [
    {
      name: {
        required: true,
        type: String,
        trim: true,
      },
      progress: {
        required: true,
        type: Number,
        trim: true,
      },
    },
  ],
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  portfolio: [
    {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
    },
  ],
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  contactEmail: {
    required: true,
    type: String,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Showcase = model("Showcase", ShowcaseSchema);

module.exports = Showcase;
