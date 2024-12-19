const { Router } = require("express");
const { post } = require("../controllers/postController");
const { like, unlike } = require("../controllers/likeController");
const { comment, getComments } = require("../controllers/commentController");
const authMidlleware = require("../auth-middleware");

const postRouter = Router();

postRouter.post("/createPost", authMidlleware, post);
postRouter.post("/comment", authMidlleware, comment);
postRouter.post("/post/like", authMidlleware, like);
postRouter.post("/post/unlike", authMidlleware, unlike);
postRouter.get("/post/:postId", authMidlleware, getComments);

module.exports = postRouter;
