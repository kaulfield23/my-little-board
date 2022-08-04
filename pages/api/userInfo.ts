import type { NextApiRequest, NextApiResponse } from "next";
import { dataAccountSearch } from "../../src/util/dataSearch";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  const query = "SELECT * FROM useraccounts WHERE userid=$1";

  if (typeof userId === "string") {
    const selectedID = await dataAccountSearch(query, userId);

    if (selectedID !== undefined) {
      if (selectedID.status !== "SELECT 0") {
        res.json({
          firstName: selectedID.rows[0][3],
          lastName: selectedID.rows[0][4],
          avatarColor: selectedID.rows[0][5],
        });
        res.status(200).end();
      }
    } else {
      res.status(401).end();
    }
  } else {
    res.status(400).end();
  }
}
