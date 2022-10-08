import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import {
  execQuery,
  dataAccountSearch,
  saveAccount,
} from "../../src/util/dataSearch";

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, userPassword, firstName, lastName, avatar } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPassword, salt);

  //create table when there is no table
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS useraccounts(id serial PRIMARY KEY, userId TEXT, userPassword TEXT, firstName TEXT, lastName TEXT, avatar TEXT, UNIQUE(userId));";
  await execQuery(createTableQuery);

  const rowExistsQuery = "SELECT EXISTS(SELECT * FROM useraccounts)";
  const rowExists = await execQuery(rowExistsQuery);

  //search if user's id already exists in database
  const userIdQuery =
    "SELECT EXISTS(SELECT * FROM useraccounts WHERE userId=$1)";

  const userIdAlreadyExsits = await dataAccountSearch(userIdQuery, userId);

  if (
    userIdAlreadyExsits?.rows[0][0] === false ||
    rowExists?.rows[0][0] === false
  ) {
    //when it doesn't exist or when there is no data in db
    const queryString = `INSERT INTO useraccounts(userid, userPassword, firstName,lastName,avatar) VALUES($1,$2,$3,$4,$5);`;
    saveAccount(queryString, userId, hash, firstName, lastName, avatar);
    return res.status(200).end();
  } else if (userIdAlreadyExsits?.rows[0][0] === true) {
    //when userid already exists
    return res.status(409).end();
  } else {
    return res.status(400).end();
  }
}
