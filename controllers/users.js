const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const { JWT_SECRET } = require("../utils/config");

const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const NotFoundError = require("../errors/not-found-error");

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Missing Info: Email or Password"));
  }
  return User.findUserByCredentials(email, password) // calling model method to verify creds
    .then((user) => {
      console.log(user);
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token }); // Return 200 and the token
    })
    .catch((error) => {
      if (error.message === "User not found") {
        return next(new ConflictError("Authentication Error: user"));
      }
      if (error.message === "Incorrect password") {
        return next(new UnauthorizedError("Authentication Error: password"));
      }
      return next(error);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)

    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      console.log("Full user object from DB:", user);
      console.log("User username field:", user.username);
      console.log("User email field:", user.email);
      return res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("UserId is invalid"));
      }
      return next(error);
    });
};

const createUser = (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return next(new BadRequestError("Missing required fields"));
  }

  return User.findOne({ email })
    .then((userId) => {
      if (userId) {
        throw new Error("User already exists");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        username,
        email,
        password: hash, // adding the hash to the db
      })
    )

    .then((user) =>
      res.status(201).send({
        username: user.username,
        email: user.email,
        _id: user._id,
      })
    ) // EXCLUDE SENDING PASSWORD DETAILS!
    .catch((error) => {
      console.error("Error creating user:", error);

      if (
        error.code === 11000 ||
        error.message.includes("User already exists")
      ) {
        return next(new ConflictError("Error: User already exists"));
      }
      if (error.username === "ValidationError") {
        return next(new BadRequestError("Error: name validation"));
      }
      return next(error);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
