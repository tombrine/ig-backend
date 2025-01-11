const { postModel } = require("../models/postSchema");

const getLikes = async (req, res) => {
  const { postId } = req.params;
  try {
    const response = await postModel.findById(postId).populate({
      path: "likes",
      select: "username profileImage",
    });
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "problem" });
  }
};

const like = async (req, res) => {
  const { likedPostId, likingUserId } = req.body;
  console.log(likingUserId, likedPostId);
  try {
    const response = await postModel.findByIdAndUpdate(likedPostId, {
      $addToSet: {
        likes: likingUserId,
      },
    });
    console.log(response.likes);
    res.status(200).json({ message: "you liked post" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const unlike = async (req, res) => {
  const { unlikedPostId, unlikingUserId } = req.body;
  try {
    await postModel.findByIdAndUpdate(unlikedPostId, {
      $pull: {
        likes: unlikingUserId,
      },
    });
    res.status(200).json({ message: "you unliked post" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { like, unlike, getLikes };
