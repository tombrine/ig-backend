const { Router } = require("express");
const {
  createUser,
  getUser,
} = require("../controllers/userController");

const {getPost, getUserPosts} = require("../controllers/postController")

const { follow, unFollow } = require("../controllers/followController");
const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.get("/users/posts", getUser);
userRouter.get("/posts", getPost);
userRouter.get("/user/posts", getUserPosts);
userRouter.post("/users/follow", follow);
userRouter.post("/users/unfollow", unFollow);

module.exports = userRouter;
