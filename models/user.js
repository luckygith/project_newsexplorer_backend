// email — the user's email which they use for registration. This field is required and should be unique to each user. It must also be validated against the email schema.
// password — password hash. Required string. You need to set the default behavior so that the database doesn't return this field.
// name — a username such as "Elise" or "Susie". String from 2 to 30 characters, required field.

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Invalid Email",
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  // trying to find the user by email
  return this.findOne({ email })
    .select("+password") // Explicitly include password for authentication// this — the User model
    .then((user) => {
      // not found - rejecting the promise
      if (!user) {
        return Promise.reject(new Error("User not found"));
      }

      // if found - comparing hashes
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect password"));
        }
        return user; // now user is available
      });
    })
    .catch((error) => {
      console.error("Authentication Error:", error.message); // Log the error for debugging
      return Promise.reject(error);
    });
};

module.exports = mongoose.model("user", userSchema);
