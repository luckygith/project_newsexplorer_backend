const router = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

// GET /articles
router.get("/", getArticles);

// POST /articles
router.post("/", createArticle);

// DELETE /articles/:articleId
router.delete("/:articleId", deleteArticle);

module.exports = router;
