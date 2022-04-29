import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { withSessionRoute } from "../../../lib/withSession";
import Comment from "../../../models/comment";
import Post, { IPost } from "../../../models/post";
import User, { IUser } from "../../../models/user";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  (await dbConnect()).connection;

  if (!req.session.user) {
    res
      .status(401)
      .json({ error: "Please log in to be able to delete comment" });
    res.end();
  }

  if (!req.body.postId) {
    res.status(400).json({ error: "No valid postId detected" });
    res.end();
  }
  try {
    const postId = req.body;
    const { user } = req.session;

    const userExist: IUser | undefined = await User.findOne({
      username: user!.username,
    }).exec();
    if (!userExist) {
      res
        .status(401)
        .json({ error: "Unable to find a user with provided username" });
      res.end();
    } else {
      const commentList = await Comment.deleteMany({ posts: postId }).exec();
      const post = await Post.findByIdAndRemove(postId).exec();
      res.status(200).json({ error: "No error" });
    }
  } catch (error) {}
}
