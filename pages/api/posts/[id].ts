import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { IPost } from "../../../models/post";
import Post from "../../../models/post";
import dbConnect from "../../../lib/mongodb";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  await dbConnect();
  try {
    const post: IPost = await Post.findOne({ postId }).exec();
    if (!post) {
      res.status(404).json(false);
    } else {
      //@ts-expect-error Mongoose method to return document with virtual properties
      res.status(200).json(post.toObject({ virtuals: true }));
    }
  } catch (error) {}
}
