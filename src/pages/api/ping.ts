import type { NextApiRequest, NextApiResponse } from "next";

type IDataResponse = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<IDataResponse>) {
  res.status(200).json({ message: "pong" });
}
