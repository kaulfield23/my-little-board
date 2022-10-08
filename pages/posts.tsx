import { Avatar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../src/components/context/LoggedInContext";
import TextareaAutosize from "@mui/base/TextareaAutosize";
const Posts: NextPage = () => {
  const { userId, isLoggedIn } = useContext(LoggedInContext);
  const [userInformation, setUserInformation] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch(`/api/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
    };

    getInfo();
  }, [userId]);

  return (
    <>
      {isLoggedIn && (
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
          />
          <Typography sx={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
            Content
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Content"
          />
        </Box>
      )}
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
