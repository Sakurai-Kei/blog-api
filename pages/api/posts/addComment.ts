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
    res.status(401).json({ error: "Please log in to be able to comment" });
    res.end();
  }

  if (!req.body) {
    res.redirect("/");
  }

  try {
    const { text, author, postId } = req.body;

    const userExist: IUser | undefined = await User.findOne({
      username: author,
    }).exec();
    const postExist: IPost | undefined = await Post.findById(postId).exec();
    if (!userExist) {
      res
        .status(401)
        .json({ error: "Unable to find a user with provided username" });
      res.end();
    } else if (userExist && !postExist) {
      res.status(401).json({ error: "User found but unable to find post" });
      res.end();
    } else {
      const comment = new Comment({
        text,
        date: new Date(),
        author: userExist._id,
        posts: postExist!._id,
      });

      const result = await comment.save();
      res.status(200).json(result);
    }
  } catch (error) {}
}
