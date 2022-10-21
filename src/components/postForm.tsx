import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
type PostFormType = {
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setSend: (value: boolean) => void;
  setBoardStatus: (value: string) => void;
};
const PostForm: FC<PostFormType> = ({
  setTitle,
  setContent,
  setSend,
  setBoardStatus,
}) => {
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
        onClick={() => {
          // setSend(!send), setToSend(!send);
          setBoardStatus("initial");
        }}
      >
        Post
      </Button>
    </Box>
  );
};

export default PostForm;
