const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

// GET /users/me
router.get("/me", getCurrentUser);

module.exports = router;
