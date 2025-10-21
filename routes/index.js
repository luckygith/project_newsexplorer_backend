const express = require("express");

const app = express();

const router = require("express").Router();
const {
  validateUserLoginBody,
  validateUserInfoBody,
} = require("../middlewares/validation");

const userRouter = require("./users");
const articleRouter = require("./articles");

const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const NotFoundError = require("../errors/not-found-error");

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// No authentication
router.post("/signup", validateUserInfoBody, createUser);
router.post("/signin", validateUserLoginBody, login);
router.use("/items", articleRouter);

// Req authentication
router.use("/users", auth, userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested route not found"));
});

module.exports = router;
