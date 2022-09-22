import { getTasks } from "@/lib/tasks";
import defaultHandler from "@/pages/_defaultHandler";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = defaultHandler<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  return res.status(201).json({ message: "Tasks not found :c", tasks: req.query });
});

export default handler;
