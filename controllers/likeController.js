const { postModel } = require("../models/postSchema");

const like = async (req, res) => {
    const { likedPostId, likingUserId } = req.body;
    try {
      await postModel.findByIdAndUpdate(likedPostId, {
        $addToSet: {
          likes: likingUserId,
        },
      });
      res.status(200).json({"message": "you liked post"});
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
      res.status(200).json({"message": "you unliked post"});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  module.exports = {like, unlike};