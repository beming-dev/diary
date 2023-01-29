// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { session_option } from "../../config/cookie";
import { withIronSessionApiRoute } from "iron-session/next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.user = {
    login: false,
  };
  req.session.destroy();
  res.status(200).redirect("/");
}

export default withIronSessionApiRoute(handler, session_option);
