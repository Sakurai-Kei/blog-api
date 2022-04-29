import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/withSession";
import User, { IUser } from "../../../models/user";
import dbConnect from "../../../lib/mongodb";
import Post, { IPost } from "../../../models/post";
import Comment from "../../../models/comment";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.id;
  await dbConnect();
  try {
    const user: IUser = await User.findOne({ username })
      .select("-password")
      .exec();
    if (!user) {
      res.status(404).json(false);
    } else {
      const postList = await Post.find({ authors: user._id })
        .populate({ path: "authors", select: "-password" })
        .exec();
      const commentList = await Comment.find({ author: user._id })
        .populate({ path: "author", select: "-password" })
        .populate({ path: "posts", select: "-password" })
        .exec();
      const data = {
        user,
        postList,
        commentList,
      };
      res.status(200).json(data);
    }
  } catch (error) {}
}
