import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import User, { IUser } from "../../models/user";
import { withSessionRoute } from "../../lib/withSession";
import dbConnect from "../../lib/mongodb";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  (await dbConnect()).connection;
  if (!req.body.loginId || !req.body.password) {
    res.redirect("/log-in");
  }

  const { loginId, password } = req.body;
  const { user } = req.session;

  if (user) {
    res.status(200).redirect("/");
  }

  try {
    const userExist: IUser | null = await User.findOne({
      $or: [{ username: loginId }, { email: loginId }],
    }).exec();

    if (!userExist) {
      res.status(404).json({ error: "No such account found" });
      res.end();
    } else {
      const samePassword = await bcrypt.compare(password, userExist.password);
      if (!samePassword) {
        res
          .status(409)
          .json({ error: "Username/Email and password combination is wrong" });
        res.end();
      }
      const user = {
        username: userExist.username,
        isAuthor: userExist.isAuthor,
      };
      req.session.user = user;
      await req.session.save();

      res.status(200).end();
    }
  } catch (error) {}
}
