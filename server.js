const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const UserRouter = require("./routes/postRouter");
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

const PORT = 8080;

const connectDatabase = async () => {
  const res = await mongoose.connect(process.env.MONGODB_URI);
  if (res) console.log("server connected");
};

connectDatabase();

app.use(userRouter);
app.use(UserRouter);

app.listen(PORT, console.log(`running on  ${PORT}`));
