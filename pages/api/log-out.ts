import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/withSession";

export default withIronSessionApiRoute(handler, sessionOptions);

function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.redirect("/log-in");
}
