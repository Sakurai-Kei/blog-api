import { NextApiRequest, NextApiResponse } from "next";
import User, { IUser } from "../../models/user";
import bcrypt from "bcryptjs";
import { withSessionRoute } from "../../lib/withSession";
import dbConnect from "../../lib/mongodb";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.redirect("/sign-up");
  }

  const { firstName, lastName, username, password, confirmPassword, email } =
    req.body;

  const { user } = req.session;

  if (user) {
    res.redirect("/");
  }

  try {
    (await dbConnect()).connection;

    const userExist: IUser = await User.findOne({
      $or: [{ username }, { email }],
    }).exec();

    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ error: "Password and confirm password does not match" });
    }

    if (userExist) {
      let alreadyExist = true;
      res.status(409).json({
        error: "Username and/or email is already in use",
        alreadyExist,
      });
    }
    if (!userExist && password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 15);
      const user = new User({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        email,
        isAuthor: false,
        posts: [],
        comments: [],
      });
      const result = await user.save();
      res.status(200).json(result);
    }
  } catch (error) {}
}
