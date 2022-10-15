import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../src/components/context/LoggedInContext";
import Board from "../src/components/Board";
import PostForm from "../src/components/postForm";
const Posts: NextPage = () => {
  const { userId, isLoggedIn } = useContext(LoggedInContext);
  const [isContent, setIsContent] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [send, setSend] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch(`/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postid: userId,
          title,
          content,
        }),
      });
      console.log(res.status);
      if (res.status === 200) {
        setIsContent(true);
      }
    };

    getInfo();
  }, [userId, send]);

  return (
    <>
      {isLoggedIn && !isContent && (
        <PostForm
          setTitle={setTitle}
          setContent={setContent}
          setSend={setSend}
        />
      )}
      {isLoggedIn && isContent && <Board />}
      {!isLoggedIn && (
        <Box
          sx={{
            backgroundColor: "#fef2a1",
            width: { xs: "300px", md: "500px" },
            margin: "100px auto",
            p: 5,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
            For using this board, You need to log in!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Posts;
