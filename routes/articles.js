const router = require("express").Router();

const {
  validateArticleItemBody,
  validateUserArticleId,
} = require("../middlewares/validation");

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

// GET /articles
router.get("/", getArticles);

// POST /articles
router.post("/", validateArticleItemBody, createArticle);

// DELETE /articles/:articleId
router.delete("/:articleId", validateUserArticleId, deleteArticle);

module.exports = router;
