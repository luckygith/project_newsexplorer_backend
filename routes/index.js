const express = require("express");

const app = express();

const router = require("express").Router();

const userRouter = require("./users");
const articleRouter = require("./articles");

const { login, createUser } = require("../controllers/users");

const NotFoundError = require("../errors/not-found-error");

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// No authentication
router.post("/signup", createUser);
router.post("/signin", login);
router.use("/items", articleRouter);

// Req authentication
router.use("/users", auth, userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested route not found"));
});

module.exports = router;
