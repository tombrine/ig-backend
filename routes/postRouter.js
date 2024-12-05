const { Router } = require("express");
const { post } = require("../controllers/postController");
const { like, unlike } = require("../controllers/likeController");
const { comment } = require("../controllers/commentController");
const UserRouter = Router();

UserRouter.post("/createPost", post);
UserRouter.post("/comment", comment);
UserRouter.post("/post/like", like);
UserRouter.post("/post/unlike", unlike);

module.exports = UserRouter;
