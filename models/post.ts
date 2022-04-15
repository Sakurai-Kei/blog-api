import { Schema, model, models } from "mongoose";
import { IComment } from "./comment";
import { IUser } from "./user";

export interface IPost {
  title: string;
  date: Date;
  text: string;
  authors: IUser[];
  comments: IComment;
  _id: Schema.Types.ObjectId;
}
