import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, username, password, confirmPassword, email } =
    req.body;

  try {
    res.status(200).json(req.body);
  } catch (error) {}
}
