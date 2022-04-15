import { Schema, model, models } from "mongoose";
import { IUser } from "./user";

export interface IComment {
  text: string;
  date: Date;
  author: IUser;
}
