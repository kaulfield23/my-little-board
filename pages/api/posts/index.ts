import { NextApiRequest, NextApiResponse } from "next";
import {
  dataAccountSearch,
  execQuery,
  savePosts,
} from "../../../src/util/dataSearch";

export default async function handlePosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postid, title, content } = req.body;
  const { userid } = req.query;
  //post the new posts
  if (postid && title && content && req.method === "POST") {
    const createTableQuery =
      "CREATE TABLE IF NOT EXISTS posts(id SERIAL PRIMARY KEY ,postid TEXT, content TEXT, title TEXT, date DATE NOT NULL DEFAULT CURRENT_DATE, CONSTRAINT fk_postid FOREIGN KEY(postid) REFERENCES useraccounts(userid));";
    await execQuery(createTableQuery);

    try {
      const queryString = `INSERT INTO posts(postid, content, title, date) VALUES($1,$2,$3,$4);`;
      const currentTime = new Date();
      await savePosts(queryString, postid, content, title, currentTime);
      return res.status(200).end();
    } catch (e) {
      console.log(e);
      return res.status(404).end();
    }

    //when user just logged in and there are no contents to show on initial page, check if table exists and then show old posts
  } else if (typeof userid === "string" && req.method === "GET") {
    const createTableQuery =
      "CREATE TABLE IF NOT EXISTS posts(id SERIAL PRIMARY KEY ,postid TEXT, content TEXT, title TEXT, date DATE NOT NULL DEFAULT CURRENT_DATE, CONSTRAINT fk_postid FOREIGN KEY(postid) REFERENCES useraccounts(userid));";
    await execQuery(createTableQuery);

    const checkPostQuery = "SELECT EXISTS(SELECT 1 FROM posts WHERE postid=$1)";
    const postExists = await dataAccountSearch(checkPostQuery, userid);

    if (postExists?.rows[0][0]) {
      return res.status(200).end();
    } else {
      return res.status(204).end();
    }
  } else {
    res.status(401).end();
  }
}
