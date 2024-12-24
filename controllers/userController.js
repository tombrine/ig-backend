const { userModel } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const createdUser = userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: createdUser._id,
        username: (await createdUser).username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.send("there is a problem");
  }
};

const getUser = async (req, res) => {
  try {
    const post = await userModel
      .find()
      .populate("posts", "caption postImage comment userId likes");
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    console.log(user.password);
    const check = bcrypt.compare(password, user.password);

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    if (check) {
      console.log("succes");
      res.json(token);
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.log(error);
    res.send("login failed");
  }
};

module.exports = {
  createUser,
  getUser,
  login,
};
