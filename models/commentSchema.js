const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    postId: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = { commentModel };
