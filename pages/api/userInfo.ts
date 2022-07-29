import type { NextApiRequest, NextApiResponse } from "next";
import { dataAccountSearch } from "../../src/util/dataSearch";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, userId } = req.query;
  if (typeof query === "string" && typeof userId === "string") {
    const selectedID = await dataAccountSearch(query, userId);

    console.log(selectedID?.rows.at(0)?.at(3), "selectedID");
    if (selectedID !== undefined) {
      if (selectedID.status !== "SELECT 0") {
        res.json({ firstName: selectedID.rows.at(0)?.at(3) });
      } else {
        res.json({ wtf: "wtf" });
      }
    }
  }
}
