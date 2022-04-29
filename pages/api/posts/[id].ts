import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { IPost } from "../../../models/post";
import Post from "../../../models/post";
import dbConnect from "../../../lib/mongodb";
import Comment from "../../../models/comment";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  (await dbConnect()).connection;
  try {
    const post = await Post.findById(postId)
      .populate("authors", "-password")
      .exec();
    if (!post) {
      res.status(404).json(false);
    } else {
      const commentList = await Comment.find({ posts: postId })
        .populate({ path: "author", select: "-password" })
        .populate({ path: "posts" })
        .exec();
      const data = {
        post,
        commentList,
      };
      res.status(200).json(data);
    }
  } catch (error) {}
}
