const { Router } = require("express");
const { post } = require("../controllers/postController");
const { like, unlike } = require("../controllers/likeController");
const { comment, getComments } = require("../controllers/commentController");
const postRouter = Router();

postRouter.post("/createPost", post);
postRouter.post("/comment", comment);
postRouter.post("/post/like", like);
postRouter.post("/post/unlike", unlike);
postRouter.get("/post/:postId", getComments)

module.exports = postRouter;
