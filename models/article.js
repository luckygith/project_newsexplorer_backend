// keyword — the word by which the articles are searched (string, required)
// title — the article title (string, required)
// text — the article text (string, required)
// date — the article date (string, required)
// source — the article source (string, required)
// link — a link to the article (string, required, must be a URL address)
// image — a link to the image for the article (string, required, must be a URL address)
// owner — the _id of the user who saved the article. You need to set the default behavior so that the database doesn't return this field

const mongoose = require("mongoose");
const validator = require("validator");

const article = new mongoose.Schema({
  q: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
  },
  publishedAt: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
  },
  urlToImage: {
    required: true,
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    // a link to the item author's model of the ObjectId type, a required field
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("clothingItem", clothingSchema);
