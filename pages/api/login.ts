// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.body.userId;
  const userPassword = req.body.userPassword;
  console.log(userId, userPassword);

  res.status(200).json({ name: "John Doe" });
}
