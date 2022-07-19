import { Box, Button, TextField, Typography } from "@mui/material";
import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

type RegisterType = {
  isMember: Dispatch<SetStateAction<boolean>>;
};

const Register: FC<RegisterType> = ({ isMember }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userId, setUserId] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/userAccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        userPassword,
        firstName,
        lastName,
      }),
    });
  };
  return (
    <>
      <Box
        sx={{
          margin: { xs: "130px 0 0 0", md: "200px 0 0 0" },
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
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
            padding: { xs: "0 25px", md: "0 150px" },
          }}
        >
          Register
        </Typography>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Create Account</Typography>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <TextField
              id="outlined-ID"
              label="ID"
              color="warning"
              sx={{ mr: { md: 1 }, mb: { xs: 1 } }}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
            <TextField
              id="outlined-password"
              label="Password"
              color="warning"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Personal Information</Typography>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <TextField
              label="First Name"
              variant="filled"
              color="success"
              sx={{ mr: { md: 1 }, mb: { xs: 1 } }}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              label="Last Name"
              variant="filled"
              color="success"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", mt: 3 }} className="enooo">
        <Button
          onClick={
            handleRegister
            // isMember(true);
          }
          variant="contained"
          color="warning"
          sx={{
            backgroundColor: "#583333",
          }}
        >
          Sign up
        </Button>
      </Box>
    </>
  );
};

export default Register;
