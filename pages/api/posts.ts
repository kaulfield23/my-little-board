import { NextApiRequest, NextApiResponse } from "next";
import {
  dataAccountSearch,
  execQuery,
  savePosts,
} from "../../src/util/dataSearch";

export default async function handlePosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, title, content } = req.body;
  console.log(userId, title, content, " posts");
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS posts(id serial PRIMARY KEY, userId TEXT, content TEXT, title TEXT, date DATE DEFAULT CURRENT_DATE, UNIQUE(userId), CONSTRAINT fk_userId FOREIGN KEY(userId) REFERENCES userAccounts(userId));";
  await execQuery(createTableQuery);

  const checkPostQuery = "SELECT EXISTS(SELECT 1 FROM posts WHERE userId=$1)";

  const postExists = await dataAccountSearch(checkPostQuery, userId);
  const currentTime = new Date();
  console.log(currentTime);
  try {
    if (!postExists?.rows[0][0]) {
      const queryString = `INSERT INTO posts(userid, content, title, date) VALUES($1,$2,$3,$4);`;
      await savePosts(queryString, userId, content, title, currentTime);
      return res.status(204).end();
    } else {
      return res.status(200).end();
    }
  } catch (e) {
    console.log(e);
    return res.status(404).end();
  }
}
