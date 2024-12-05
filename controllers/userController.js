const { userModel } = require("../models/userSchema");

const createUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);

    const response = await userModel.create(user);
    console.log(response);
    res.send("done");
  } catch (error) {
    console.log(error);
    res.send("there is a problem");
  }
};

const getUser = async (req, res) => {
  try {
    const post = await userModel
      .find()
      .populate("posts", "caption postImage comment userId");
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  getUser,
};
