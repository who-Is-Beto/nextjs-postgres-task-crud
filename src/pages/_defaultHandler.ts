import { NextApiResponse } from "next";
import nextConnect from "next-connect";

export default function defaultHandler<ReqType, ResType>() {
  return nextConnect<ReqType, ResType>({
    attachParams: true,
    onError(error, _, res) {
      console.error(error);

      (res as unknown as NextApiResponse)
        .status(500)
        .json({ message: "Something went wrong :c Internal Server Error" });
    }
  });
}
