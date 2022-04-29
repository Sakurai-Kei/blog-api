import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";
import Post from "../../models/post";
import dbConnect from "../../lib/mongodb";
import User from "../../models/user";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  (await dbConnect()).connection;
  try {
    const authorList = await User.find({ isAuthor: true }).exec();
    const postList = await Post.find()
      .populate({ path: "authors", select: "-password" })
      .exec();
    res.status(200).json(postList);
  } catch (error) {}
}
