import { MovieSharp } from "@mui/icons-material";
import { NextApiRequest, NextApiResponse } from "next";
import { execQuery } from "../../../src/util/dataSearch";

export default async function userPostHandler(
    req:NextApiRequest,
    res:NextApiResponse
){
    const userId = req.query.userId;
    const posts = [];

    if(req.method === "GET"){
        const searchQuery = "SELECT posts.title, posts.content, posts.date FROM posts LEFT JOIN useraccounts ON (posts.postid=useraccounts.userid);"
        const result = await execQuery(searchQuery);

        if(result){
            for await(const row of result){
                posts.push(row);
            }
        }

        console.log(posts , "result");
        return res.status(200).json(posts);
    } else {
        return res.status(401).end();
    }
}