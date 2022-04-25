import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { sessionOptions } from "../../../lib/withSession";
import Comment from "../../../models/comment";
import User from "../../../models/user";
import Post from "../../../models/post";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqId = req.query.id;

  (await dbConnect()).connection;
  try {
    const user = await User.findOne({ username: reqId }).exec();
    if (user) {
      const commentList = await Comment.find({ author: user._id })
        .populate("author")
        .exec();
      if (!commentList.length) {
        res.status(200).json(false);
      } else {
        res.status(200).json(commentList);
      }
    } else {
      const commentList = await Comment.find({ posts: reqId })
        .populate("author")
        .exec();
      if (!commentList) {
        res.status(404).json(false);
      } else {
        res.status(200).json(commentList);
      }
    }
    res.end();
  } catch (error) {}
}
