// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Query } from "ts-postgres";

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
  // const accountQuery = "SELECT * FROM useraccounts WHERE userid=$1";
  // const searchedId = new Query(accountQuery, [userId]);
  // const selectedId = await client.execute(searchedId);

  res.status(200).json({ name: "John Doe" });
}
