import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions, withSessionRoute } from "../../lib/withSession";
import Post, { IPost } from "../../models/post";
import { withIronSessionApiRoute } from "iron-session/next";
import dbConnect from "../../lib/mongodb";
import User from "../../models/user";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  (await dbConnect()).connection;
  try {
    const authorList = await User.find({ isAuthor: true }).exec();
    const postList = await Post.find().populate("authors").exec();
    res.json(postList);
  } catch (error) {}
}
