const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

// GET /users/me
router.get("/me", auth, getCurrentUser);

module.exports = router;
