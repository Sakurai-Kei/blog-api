import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/post";
import dbConnect from "../../../lib/mongodb";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  (await dbConnect()).connection;
  const formData = req.body;

  if (!req.session.user || !req.session.user.isAuthor) {
    res
      .status(400)
      .json({
        error:
          "User does not have the necessary auth requirement. Redirecting to post page",
      });
    res.end();
  }

  try {
    const post = await Post.findByIdAndUpdate(formData._id, formData).exec();
    res.status(200).json(post);
  } catch (error) {}
}
