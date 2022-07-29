import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { dataAccountSearch, saveAccount } from "../../src/util/dataSearch";

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, userPassword, firstName, lastName, avatar } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPassword, salt);

  // //search if user's id already exists in database
  const query = "SELECT * FROM useraccounts WHERE userid=$1";
  const isExists = await dataAccountSearch(query, userId);
  if (isExists?.status === "SELECT 0") {
    //when it doesn't exist
    const queryString = `INSERT INTO useraccounts(userid, userPassword, firstName,lastName,avatar) VALUES($1,$2,$3,$4,$5);`;
    saveAccount(queryString, userId, hash, firstName, lastName, avatar);
    return res.status(200).end();
  } else if (isExists?.status !== "SELECT 0") {
    //when userid already exists
    return res.status(409).end();
  } else {
    return res.status(400).end();
  }
}
