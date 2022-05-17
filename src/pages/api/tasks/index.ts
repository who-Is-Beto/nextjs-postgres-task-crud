import type { NextApiRequest, NextApiResponse } from "next";

export default function tasks(request: NextApiRequest, response: NextApiResponse) {
  const { method } = request;

  switch (method) {
    case "GET":
      return response.status(200).json("getting tasks");
    case "POST":
      return response.status(201).json("creating new task");
    default:
      return response.status(401).json({
        error: "Invalid method"
      });
  }
}
