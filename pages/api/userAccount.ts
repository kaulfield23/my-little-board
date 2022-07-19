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

  const queryString = `INSERT INTO useraccounts(userid, userPassword, firstName,lastName) VALUES($1,$2,$3,$4);`;
  const query = new Query(queryString, [userId, hash, firstName, lastName]);

  client.execute(query);

  const result = await client.query("SELECT * FROM useraccounts");
  console.log(result, "result");
  res.status(200).json({ name: "John Doe" });
}
