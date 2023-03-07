import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { LoggedInContext } from "./context/LoggedInContext";
type PostFormType = {
  setBoardStatus: (value: string) => void;
};

type PostInfoType = {
  title:string | undefined;
  content:string | undefined;
}
const PostForm: FC<PostFormType> = ({ setBoardStatus }) => {
  const { userId } = useContext(LoggedInContext);
  const [postInfo, setPostInfo] = useState<PostInfoType>({title:undefined, content:undefined});
  
  const postMessages = async () => {
    const res = await fetch(`/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postid: userId,
        title:postInfo.title,
        content:postInfo.content,
      }),
    });
    if (res.status === 200) {
      setBoardStatus("show board");
    }
  };

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
        onChange={(e) => setTimeout(() => setPostInfo((prev) => ({...prev, title:e.target.value})), 500)}

      />
      <Typography sx={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
        Content
      </Typography>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        placeholder="Content"
        onChange={(e) => setTimeout(() => setPostInfo((prev) => ({...prev, content:e.target.value})), 500)}
      />
      <Button
        type="submit"
        variant="contained"
        color="warning"
        sx={{ m: "20px auto" }}
        onClick={() => {
          if (postInfo.title && postInfo.content) postMessages();
        }}
      >
        Post
      </Button>
    </Box>
  );
};

export default PostForm;
