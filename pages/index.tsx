import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import { useContext } from "react";
import Board from "../src/components/Board";
import { LoggedInContext } from "../src/components/context/LoggedInContext";

const Home: NextPage = () => {
  const { isLoggedIn } = useContext(LoggedInContext);

  return (
    <>
      {isLoggedIn && <Board />}
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

export default Home;
