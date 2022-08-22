import { NextApiRequest, NextApiResponse } from "next";
import { execQuery } from "../../src/util/dataSearch";

export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const searchTable =
      "SELECT EXISTS(SELECT FROM pg_tables WHERE schemaname='public' AND tablename='posts')";
    const result = await execQuery(searchTable);
    if (result?.rows[0][0] === false) {
      const createTableQuery =
        "CREATE TABLE posts(postId INT, userid TEXT UNIQUE, content TEXT, writing_time DATE NOT NULL DEFAULT CURRENT_DATE,CONSTRAINT fk_userid FOREIGN KEY(userid)REFERENCES useraccounts(userid));";
      execQuery(createTableQuery);
    }
    res.json({ hello: "world" });
  }

  if (req.method === "POST") {
    console.log("post smth");
    res.status(200).end();
  }
}

// CREATE TABLE IF NOT EXISTS posts(
//     post_id INT,
//     userid TEXT UNIQUE,useraccounts
//     content TEXT,
//     writing_time DATE NOT NULL DEFAULT CURRENT_DATE,
//     CONSTRAINT fk_userid
//     FOREIGN KEY(userid)
//     REFERENCES useraccounts(userid));
