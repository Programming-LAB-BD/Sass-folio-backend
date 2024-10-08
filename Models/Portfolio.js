const { Schema, model } = require("mongoose");

const PortfolioSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    screenShot: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      required: true,
      type: String,
      trim: true,
      minlength: 200,
    },
    showcase: {
      type: Schema.Types.ObjectId,
      ref: "Showcase",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
