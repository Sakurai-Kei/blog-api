import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import bcrypt from "bcryptjs";
import db from "../../lib/mongodb";
import User, { IUser } from "../../models/user";
import { IronSessionOptions } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      username: string;
      isLoggedIn: boolean;
      isAuthor: boolean;
    };
  }
}

const sessionOptions: IronSessionOptions = {
  cookieName: "userCookie",
  password: process.env.COOKIE_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { loginId, password } = req.body;

  try {
    db.on("error", function () {
      res.status(502).json({ error: "Unable to connect to database" });
    });

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
        isLoggedIn: true,
        isAuthor: userExist.isAuthor,
      };
      req.session.user = user;
      await req.session.save();

      res.status(200).json({ user });
    }
  } catch (error) {}
}
