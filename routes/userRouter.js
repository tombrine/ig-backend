const { Router } = require("express");
const { createUser, getUser, login, EditUserProfileIMG } = require("../controllers/userController");
const authMidlleware = require("../auth-middleware");

const { getPost, getUserPosts } = require("../controllers/postController");

const { follow, unFollow } = require("../controllers/followController");
const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.get("/profile/:userId", authMidlleware, getUser);
userRouter.get("/posts", authMidlleware, getPost);
userRouter.get("/user/posts", authMidlleware, getUserPosts);
userRouter.post("/users/follow", authMidlleware, follow);
userRouter.post("/users/unfollow", authMidlleware, unFollow);
userRouter.post("/login", login);
userRouter.post("/user/edit/profileIMG", authMidlleware, EditUserProfileIMG)

module.exports = userRouter;
