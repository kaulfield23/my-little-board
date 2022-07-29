import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = new Cookies(req, res);
    cookies.set("session");
    return res.status(200).end();
  } catch (err) {
    return res.status(405).end();
  }
}
