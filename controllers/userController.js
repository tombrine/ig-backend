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
    const URL = req.params["userId"];
    console.log(URL);
    const user = await userModel.findById(URL);
    const POP = await user.populate("following followers posts");
    console.log(POP);
    res.status(200).send(POP);
  } catch (error) {
    console.log(error);
    res.send("err");
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
      res.json({ token });
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.log(error);
    res.send("login failed");
  }
};

const EditUserProfileIMG = async (req, res) => {
  try {
    const file = req.body.profileImage;
    const userId = req.body._id;

    const POPOP = await userModel.findByIdAndUpdate(userId, {
      profileImage: file,
    });

    res.status(200).send(POPOP);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  createUser,
  getUser,
  login,
  EditUserProfileIMG
};
