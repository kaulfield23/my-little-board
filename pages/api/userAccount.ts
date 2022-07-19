import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId, userPassword, firstName, lastName } = req.body;

  res.status(200).json({ name: "John Doe" });
}
