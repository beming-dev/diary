// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import util from "util";
import crypto from "crypto";
import executeQuery from "../../lib/db";
import { session_option } from "../../config/cookie";
import { withIronSessionApiRoute } from "iron-session/next";

async function handler(
  req: NextApiRequest & { session: any },
  res: NextApiResponse
) {
  const { input1, input2, input3 } = req.body;
  if (input1 === process.env.ALLOWED_ID) {
    console.log(2);
    const pbkdf2Promise = util.promisify(crypto.pbkdf2);
    const key = await pbkdf2Promise(input2, input3, 107113, 64, "sha512");
    const hashedPassword = key.toString("base64");

    const result = await executeQuery(
      "SELECT * FROM users WHERE id=? AND password=?",
      [input1, hashedPassword]
    );
    if (result && result[0].length) {
      req.session.user = {
        login: true,
      };
      await req.session.save();
    }
    console.log(3);
  }
  console.log(4);

  res.status(200).send({});
}

export default withIronSessionApiRoute(handler, session_option);
