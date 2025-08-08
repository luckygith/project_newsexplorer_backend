const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");

const Article = require("../models/article");

const createArticle = (req, res, next) => {
  const { q, title, description, publishedAt, source, link, urlToImage } =
    req.body;
  Article.create({
    q,
    title,
    description,
    publishedAt,
    source,
    link,
    urlToImage,
    owner: req.user._id,
  })
    .then((articles) => res.send(articles))
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(
          new BadRequestError("Could not update with information provided.")
        );
      } else {
        next(error);
      }
    });
};

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send(articles))
    .catch((error) => {
      next(error);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        return next(new NotFoundError("Item not found"));
      }
      if (article.owner.toString() !== userId) {
        return next(
          new ForbiddenError("Forbidden error: revoked user accessed")
        );
      }

      return Article.findByIdAndDelete(articleId).then(() =>
        res.status(200).send({ message: "Item successfully deleted" })
      );
    })
    .catch((error) => {
      console.error(error);
      if (error.name === "CastError") {
        next(new BadRequestError("Failed to delete article"));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createArticle,
  getArticles,
  deleteArticle,
};
