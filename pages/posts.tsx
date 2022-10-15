import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../src/components/context/LoggedInContext";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Board from "../src/components/Board";
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
          postid:userId,
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
  console.log(isContent, "is content")
  const handlePost = async () => {
    const res = await fetch(`/api/posts`);
  };

  return (
    <>
      {isLoggedIn && !isContent && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: { xs: "80px auto", sm: "200px auto" },
            flexDirection: "column",
            maxWidth: "800px",
            fontFamily: "monospace",
            backgroundColor: "beige",
            padding: "20px",
          }}
        >
          <Typography sx={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
            Title
          </Typography>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            onChange={(e) => setTimeout(() => setTitle(e.target.value), 1000)}
          />
          <Typography sx={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
            Content
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Content"
            onChange={(e) => setTimeout(() => setContent(e.target.value), 1000)}
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ m: "20px auto" }}
            onClick={() => setSend(!send)}
          >
            Post
          </Button>
        </Box>
      )}
      {isLoggedIn && isContent && "hello world"}
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
