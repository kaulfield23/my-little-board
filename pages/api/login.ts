import type { NextApiRequest, NextApiResponse } from "next";
import { dataAccountSearch } from "../../src/util/dataSearch";
import bcrypt from "bcrypt";
import Cookies from "cookies";
import Iron from "@hapi/iron";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.body.userId;
  const userPassword = req.body.userPassword;

  const query = "SELECT userPassword FROM useraccounts WHERE userid=$1";
  const selectedID = await dataAccountSearch(query, userId);
  const correctPassword = String(selectedID?.rows[0][0]);

  if (selectedID) {
    const typeRightPassword = await bcrypt.compare(
      userPassword,
      correctPassword
    );

    if (typeRightPassword) {
      const cookies = new Cookies(req, res);
      const ENC_KEY =
        process.env.ENC_KEY || "this_is_the_default_key_for_my_little_board";

      cookies.set(
        "session",
        await Iron.seal({ loggedIn: true }, ENC_KEY, Iron.defaults)
      );
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } else {
    res.status(405).end();
  }
}
