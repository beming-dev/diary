// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import util from "util";
import crypto from "crypto";
import executeQuery from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { input1, input2, input3 } = req.body;

  if (input1 === process.env.NEXT_PUBLIC_ALLOWED_ID) {
    const pbkdf2Promise = util.promisify(crypto.pbkdf2);
    const key = await pbkdf2Promise(input2, input3, 107113, 64, "sha512");
    const hashedPassword = key.toString("base64");

    const result = await executeQuery(
      "SELECT * FROM users WHERE id=? AND password=?",
      [input1, hashedPassword]
    );

    if (result[0].length) {
    }
  } else {
    res.status(200).json({ msg: "error" });
  }
}
