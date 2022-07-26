import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { Client, Query } from "ts-postgres";
import { dataAccountSearch, saveAccount } from "../../src/util/dataSearch";

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

  // //search if user's id already exists in database
  const query = "SELECT * FROM useraccounts WHERE userid=$1";
  const isExists = await dataAccountSearch(query, userId);
  // console.log(isExists, "eng???????e");
  if (isExists?.status === "SELECT 0") {
    //when it doesn't exist
    console.log("hello????");
    // const client = new Client({
    //   user: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASS,
    //   port: 1337,
    // });
    // await client.connect();
    const queryString = `INSERT INTO useraccounts(userid, userPassword, firstName,lastName) VALUES($1,$2,$3,$4);`;
    saveAccount(queryString, userId, hash, firstName, lastName);
    // const savingAccountQuery = new Query(queryString, [
    //   userId,
    //   hash,
    //   firstName,
    //   lastName,
    // ]);
    // client.execute(savingAccountQuery);

    return res.status(200).end();
  } else if (isExists?.status !== "SELECT 0") {
    //when userid already exists
    return res.status(409).end();
  } else {
    return res.status(400).end();
  }
}
