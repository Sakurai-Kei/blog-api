import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/withSession";
import User, { IUser } from "../../../models/user";
import dbConnect from "../../../lib/mongodb";
import Post from "../../../models/post";
import Comment from "../../../models/comment";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.redirect("/");
    res.end();
  }

  (await dbConnect()).connection;
  try {
    const username = req.body;
    const user = await User.findOneAndDelete({ username }).exec();
    const postList = await Post.deleteMany({ authors: user._id }).exec();
    const commentList = await Comment.deleteMany({ author: user._id }).exec();
    req.session.destroy();
    res.status(200).json({ error: "Success" });
  } catch (error) {}
}
