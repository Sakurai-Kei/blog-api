import { Schema, model, models } from "mongoose";
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
  _id: Schema.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
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
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

userSchema.virtual("fullName").get(function (this: IUser) {
  return this.firstName + " " + this.lastName;
});

userSchema.virtual("url").get(function (this: IUser) {
  return "/user/" + this.username;
});

const User = models.User || model("User", userSchema);

export default User;
