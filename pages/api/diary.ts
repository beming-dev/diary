// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../lib/db";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method?.toUpperCase() === "GET") {
    const { date } = req.query;
    const result = await executeQuery("SELECT * FROM diary WHERE point=?", [
      date,
    ]);
    res.status(200).json(result[0][0]);
  } else if (req.method?.toUpperCase() === "POST") {
    const { title, description, date } = req.body;
    executeQuery(
      `INSERT INTO diary (title, description, point)
       VALUES(?, ?, ?) ON DUPLICATE KEY
       UPDATE title=?, description=?`,
      [title, description, date, title, description]
    );
    res.status(200).json({ name: "John Doe" });
  }
}
