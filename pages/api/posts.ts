import { NextApiRequest, NextApiResponse } from "next";
import { execQuery } from "../../src/util/dataSearch";

export default async function handlePosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS posts(id serial PRIMARY KEY, userId TEXT, content TEXT, title TEXT, date DATE DEFAULT CURRENT_DATE, UNIQUE(userId), CONSTRAINT fk_userId FOREIGN KEY(userId) REFERENCES userAccounts(userId));";
  await execQuery(createTableQuery);
  console.log("hey");
}
