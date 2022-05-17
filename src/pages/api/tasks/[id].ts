import { NextApiRequest, NextApiResponse } from "next";

export default function taskById(request: NextApiRequest, response: NextApiResponse): void {
  const { method } = request;

  switch (method) {
    case "GET":
      return response.status(200).json("getting unique task");
    case "PUT":
      return response.status(201).json("updating unique task");
    case "DELETE":
      return response.status(200).json("deleting unique task");
    default:
      return response.status(401).json("INVALID METHOD");
  }
}
