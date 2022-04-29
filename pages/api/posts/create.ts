import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { withSessionRoute } from "../../../lib/withSession";
import Post from "../../../models/post";
import User, { IUser } from "../../../models/user";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  (await dbConnect()).connection;

  if (!req.session.user || !req.session.user.isAuthor) {
    res.status(401).json({ error: "Not authenticated for this api use" });
    res.end();
  }

  if (!req.body) {
    res.redirect("/posts/create");
  }

  try {
    const { title, text } = req.body;
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
      const post = new Post({
        title,
        date: new Date(),
        text,
        authors: userExist._id,
        comments: [],
      });
      const result = await post.save();
      res.status(200).json(result);
    }
  } catch (error) {}
}
