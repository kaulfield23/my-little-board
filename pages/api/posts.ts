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
  const { postid, title, content } = req.body;
  // const createTableQuery =
  //   "CREATE TABLE IF NOT EXISTS posts(id serial PRIMARY KEY, userId TEXT, content TEXT, title TEXT, date DATE DEFAULT CURRENT_DATE, UNIQUE(userId), CONSTRAINT fk_userId FOREIGN KEY(userId) REFERENCES userAccounts(userId));";
  
  if(postid && title && content){
    const createTableQuery = "CREATE TABLE IF NOT EXISTS posts(id SERIAL PRIMARY KEY ,postid TEXT, content TEXT, title TEXT, date DATE NOT NULL DEFAULT CURRENT_DATE, UNIQUE(postid), CONSTRAINT fk_postid FOREIGN KEY(postid) REFERENCES useraccounts(userid));"
    await execQuery(createTableQuery);
  
    const checkPostQuery = "SELECT EXISTS(SELECT 1 FROM posts WHERE postid=$1)";
  
    const postExists = await dataAccountSearch(checkPostQuery, postid);
    const currentTime = new Date();
   
    try {
      if (!postExists?.rows[0][0]) {
        const queryString = `INSERT INTO posts(postid, content, title, date) VALUES($1,$2,$3,$4);`;
        await savePosts(queryString, postid, content, title,currentTime);
        return res.status(200).end();
      } 
    } catch (e) {
      console.log(e);
      return res.status(404).end();
    }
  } else {
    return res.status(204).end();
  }
}
