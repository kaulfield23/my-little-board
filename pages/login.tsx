import React, { useState } from "react";
import type { NextPage } from "next";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import Register from "../src/components/Register";

const Login: NextPage = () => {
  const [isMember, setIsMember] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  console.log(userId, userPassword, "ye");

  const textFieldValue = ["Account", "Password"];
  return (
    <>
      {isMember && (
        <Box
          sx={{
            maxWidth: "700px",
            margin: { xs: "250px auto", md: "180px auto" },
            padding: { xs: "0 50px" },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              mb: 5,
              fontSize: "2rem",
              fontWeight: 700,
              color: "#583333",
              backgroundColor: "#fff5b6",
              border: "5px solid #583333",
              borderRadius: "10px",
            }}
          >
            Log in
          </Typography>
          {textFieldValue.map((item) => {
            return (
              <TextField
                key={item}
                id="input-with-icon-textfield"
                label={item}
                color="warning"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {item === "Account" && <AccountCircle color="warning" />}
                      {item === "Password" && <LockIcon color="warning" />}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  if (item === "Account") {
                    setUserId(e.target.value);
                  } else {
                    setUserPassword(e.target.value);
                  }
                }}
                variant="standard"
              />
            );
          })}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography sx={{ fontFamily: "monospace" }}>
              Not a member?
            </Typography>
            <Button
              variant="contained"
              color="warning"
              sx={{ ml: 1, backgroundColor: "#583333" }}
              onClick={() => setIsMember(false)}
            >
              Register
            </Button>
          </Box>
        </Box>
      )}
      {!isMember && <Register isMember={setIsMember} />}
    </>
  );
};

export default Login;
