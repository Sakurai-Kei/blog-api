import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/user";
import db from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, username, password, confirmPassword, email } =
    req.body;

  db.on("error", console.error.bind(console, "MongoDB Connection Error: "));

  try {
    const user = new User({
      firstName,
      lastName,
      username,
      password,
      email,
      isAuthor: false,
      posts: [],
      comments: [],
    });
    await user.save();
    res.status(200).json(req.body);
  } catch (error) {}
}
