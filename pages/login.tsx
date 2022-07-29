import React, { FormEvent, useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  Alert,
  AlertTitle,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import Register from "../src/components/Register";
import { LoggedInContext } from "../src/components/context/LoggedInContext";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [isMember, setIsMember] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const { changeLoggedInState, isLoggedIn } = useContext(LoggedInContext);
  const textFieldValue = ["Account", "Password"];

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleError = (msg: string) => {
    setError(msg);
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userPassword,
      }),
    });

    if (res.status === 200) {
      changeLoggedInState(true, userId);
    } else if (res.status === 401) {
      handleError("not accepted");
    } else {
      handleError("error");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);
  return (
    <>
      {error === "error" && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong! — <strong>Please try again</strong>
        </Alert>
      )}
      {error === "not accepted" && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          ID or Password is not correct — <strong>Please try again</strong>
        </Alert>
      )}
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
          <Box component="form">
            {textFieldValue.map((item) => {
              return (
                <TextField
                  key={item}
                  id="input-with-icon-textfield"
                  label={item}
                  color="warning"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {item === "Account" && (
                          <AccountCircle color="warning" />
                        )}
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
            <Button
              type="submit"
              variant="contained"
              color="warning"
              sx={{ mt: 3 }}
              onClick={handleLogin}
            >
              Log in
            </Button>
          </Box>
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
      {!isMember && <Register handleBack={setIsMember} />}
    </>
  );
};

export default Login;
