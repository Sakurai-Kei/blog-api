import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions, withSessionRoute } from "../../lib/withSession";
import Post, { IPost } from "../../models/post";
import { withIronSessionApiRoute } from "iron-session/next";
import dbConnect from "../../lib/mongodb";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  (await dbConnect()).connection;
  try {
    const postList = await Post.find().populate("authors").exec();
    res.json(postList);
  } catch (error) {}
}
