import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/withSession";
import User, { IUser } from "../../../models/user";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.id;

  try {
    const user: IUser = await User.findOne({ username }).exec();
    if (!user) {
      res.status(404).json(false);
    } else {
      //@ts-ignore Mongoose method to return document with virtual properties
      res.status(200).json(user.toObject({ virtuals: true }));
    }
  } catch (error) {}
}
