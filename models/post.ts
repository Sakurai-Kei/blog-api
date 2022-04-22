import { Schema, model, models } from "mongoose";
import { IComment } from "./comment";
import { IUser } from "./user";

export interface IPost {
  title: string;
  date: Date | string;
  text: string;
  authors: IUser | string;
  comments: IComment | string;
  _id: Schema.Types.ObjectId | string;
}
