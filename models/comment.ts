import { Schema, model, models } from "mongoose";
import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment {
  text: string;
  date: Date;
  author: IUser;
  posts: IPost;
  _id: string;
}

const opts = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

const commentSchema = new Schema<IComment>(
  {
    text: { type: String, required: [true, "Text is required"] },
    date: { type: Date, required: [true, "Date is required"] },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author of comment is required"],
    },
    posts: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Blog post parent is required"],
    },
  },
  opts
);

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
