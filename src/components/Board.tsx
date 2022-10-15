import React, { FC, useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { LoggedInContext } from "./context/LoggedInContext";

type DataType = {
  data: ["", "", ""];
};

const Board: FC = () => {
  const [posts, setPosts] = useState<any>([]);
  const { userAvatarColor, userId } = useContext(LoggedInContext);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`/api/posts/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const postsValue = await res.json();
      setPosts([...postsValue]);
    };
    getPosts();
  }, []);

  return (
    <>
      {posts.map((item: DataType, index: number) => {
        let postDate = item.data[2].split("T");
        return (
          <Card sx={{ maxWidth: 345, margin: "100px auto" }} key={index}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: `${userAvatarColor}` }}
                  aria-label="post"
                >
                  {userId.charAt(0)}
                </Avatar>
              }
              title={item.data[0]}
              subheader={postDate[0]}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.data[1]}
              </Typography>
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default Board;
