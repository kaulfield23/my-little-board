import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { Client, Query } from "ts-postgres";

type Data = {
  name: string;
};

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId, userPassword, firstName, lastName } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPassword, salt);

  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    port: 1337,
  });
  await client.connect();
  //search if user's id already exists in database
  const isSame = "SELECT * FROM useraccounts WHERE userid=$1";
  const searchUserId = new Query(isSame, [userId]);
  const isExists = await client.execute(searchUserId);

  if (isExists.status === "SELECT 0") {
    //when it doesn't exist
    const queryString = `INSERT INTO useraccounts(userid, userPassword, firstName,lastName) VALUES($1,$2,$3,$4);`;
    const query = new Query(queryString, [userId, hash, firstName, lastName]);

    client.execute(query);

    return res.status(200).end();
  } else if (isExists.status !== "SELECT 0") {
    //when userid already exists
    return res.status(409).end();
  } else {
    return res.status(400).end();
  }
}
