const path = require("path");
const { commentModel } = require("../models/commentSchema");
const { postModel } = require("../models/postSchema");

const comment = async (req, res) => {
  const { postId, userId, comment } = req.body;
  try {
    const createdComment = await commentModel.create({
      comment,
      userId,
      postId,
    });

    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comment: createdComment._id,
      },
    });
    res.status(200).json("comment is posted");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getComments = async (req, res) => {
  try {
    const { postId } = req.query;
    const response = await postModel.find(postId).populate({
      path: "comment",
      populate: {
        path: "userId",
        select: "username profileImage",
      },
    });
    console.log(response);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { comment, getComments };
