const { userModel } = require("../models/userSchema");

const follow = async (req, res) => {
  const { followedUserId, followingUserId } = req.body;
  if (followedUserId === followingUserId) {
    res.status(500).json("cannot follow yourself");
  }
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followedUserId,
      },
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const unFollow = async (req, res) => {
  const { unfollowedUserId, unfollowingUserId } = req.body;
  try {
    await userModel.findByIdAndUpdate(unfollowingUserId, {
      $pull: {
        following: unfollowedUserId,
      },
    });
    await userModel.findByIdAndUpdate(unfollowedUserId, {
      $pull: {
        followers: unfollowingUserId,
      },
    });
    res.status(200).json("unfollowed");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { follow, unFollow };
