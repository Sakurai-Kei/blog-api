import mongoose from "mongoose";
import { IPost } from "./post";
import { IComment } from "./comment";

export interface IUser {
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  isAuthor: boolean;
  email: string;
  posts?: IPost[];
  comments?: IComment[];
  _id: mongoose.Schema.Types.ObjectId;
  fullName?: string;
  url: string;
}

const opts = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      required: [true, "Username is required"],
      maxLength: [20, "Username is too long. Maximum is 20 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: { type: String, required: true },
    isAuthor: { type: Boolean, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  opts
);

userSchema.virtual("fullName").get(function (this: IUser) {
  return this.firstName + " " + this.lastName;
});

userSchema.virtual("url").get(function (this: IUser) {
  return "/user/" + this.username;
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
