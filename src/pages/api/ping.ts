import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../database";

type IDataResponse = {
  message: string;
  time: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<IDataResponse>) {
  const response = await connection.query("SELECT NOW()");
  res.status(200).json({ message: "pong", time: response.rows[0].now });
}
