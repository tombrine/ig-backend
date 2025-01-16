const { Schema, default: mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    caption: { type: String, required: true },
    postImage: [{ type: String, required: true }],
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = { postModel };
