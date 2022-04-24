import mongoose from "mongoose";
import { IComment } from "./comment";
import { IUser } from "./user";

export interface IPost {
  title: string;
  date: Date;
  text: string;
  authors: IUser;
  comments: IComment;
  _id: mongoose.Schema.Types.ObjectId;
}

const opts = {
  toJSON: {
    virtuals: true,
  },
};

const postSchema = new mongoose.Schema<IPost>(
  {
    title: { type: String, required: [true, "Title is required"] },
    date: { type: Date, required: [true, "Date is required"] },
    text: { type: String, required: [true, "Post must have content"] },
    authors: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  opts
);

postSchema.virtual("url").get(function (this: IPost) {
  return "/posts/" + this._id;
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
