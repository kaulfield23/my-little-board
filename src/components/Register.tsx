import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import LoggedInModal from "./LoggedInModal";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

type RegisterType = {
  handleBack: Dispatch<SetStateAction<boolean>>;
};

const Register: FC<RegisterType> = ({ handleBack }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [msg, setMsg] = useState("");

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
    if (res.status === 409) {
      setMsg("sameId");
      const timer = setTimeout(() => {
        setMsg("");
      }, 5000);
    } else if (res.status === 200) {
      setMsg("accepted");
    } else {
      throw new Error("error");
    }
  };
  return (
    <>
      <ArrowCircleLeftIcon
        sx={{
          cursor: "pointer",
          fontSize: "3rem",
          m: 3,
          color: "orange",
        }}
        onClick={() => {
          handleBack(true);
        }}
      />
      {msg === "sameId" && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          The ID already exists! — <strong>Please try another ID</strong>
        </Alert>
      )}
      {msg === "accepted" && <LoggedInModal isMember={handleBack} />}

      <Box
        sx={{
          margin: { xs: "100px 0 0 0", md: "70px 0 0 0" },
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
          <Typography sx={{ mb: 2 }}>Create Account</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            component="form"
          >
            <TextField
              id="outlined-ID"
              label="ID"
              color="warning"
              sx={{ mb: 1, width: { xs: "280px", md: "500px" } }}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              required
            />
            <TextField
              id="outlined-password"
              label="Password"
              color="warning"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              required
            />
            <Typography sx={{ mt: 2, mb: 2 }}>Personal Information</Typography>
            <TextField
              label="First Name"
              variant="filled"
              color="success"
              sx={{ mb: 1 }}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
            <TextField
              label="Last Name"
              variant="filled"
              color="success"
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="warning"
              type="submit"
              sx={{ mt: 2, backgroundColor: "#583333" }}
              onClick={handleRegister}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
