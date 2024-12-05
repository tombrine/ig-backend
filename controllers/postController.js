const { postModel } = require("../models/postSchema");
const { userModel } = require("../models/userSchema");

const post = async (req, res) => {
  const { caption, postImage, userId, comment } = req.body;
  try {
    const createdPost = await postModel.create({
      caption,
      postImage,
      userId,
      comment,
    });
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: createdPost._id,
      },
    });
    res.status(200).json(createdPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserPosts = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await postModel.find({ userId });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await postModel
      .find()
      .populate("comment", "comment")
      .populate("likes", "username profileImage");
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { post, getPost, getUserPosts };