import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { LoggedInContext } from "./context/LoggedInContext";
type PostFormType = {
  setBoardStatus: (value: string) => void;
};
const PostForm: FC<PostFormType> = ({ setBoardStatus }) => {
  const { userId } = useContext(LoggedInContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const postMessages = async () => {
      const res = await fetch(`/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postid: userId,
          title,
          content,
        }),
      });
      if (res.status === 200) {
        setBoardStatus("show board");
      }
    };

    if (title && content) {
      postMessages();
    }
  }, [userId, sending]);

  return (
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
        onChange={(e) => setTimeout(() => setTitle(e.target.value), 400)}
      />
      <Typography sx={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
        Content
      </Typography>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        placeholder="Content"
        onChange={(e) => setTimeout(() => setContent(e.target.value), 400)}
      />
      <Button
        type="submit"
        variant="contained"
        color="warning"
        sx={{ m: "20px auto" }}
        onClick={() => {
          setSending(!sending);
        }}
      >
        Post
      </Button>
    </Box>
  );
};

export default PostForm;
