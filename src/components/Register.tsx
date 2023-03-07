import {
  Alert,
  AlertTitle,
  Box,
  Button,
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
  const [userInfo, setUserInfo] = useState({ userId: "", userPassword: "", firstName: "", lastName: "", })
  const [msg, setMsg] = useState("");


  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const avatar = `#${randomColor}`
   
    const res = await fetch(`/api/userAccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userInfo.userId,
        userPassword: userInfo.userPassword,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        avatar,
      }),
    });
    
    if (res.status === 409) {
      setMsg("sameId");
      const timer = setTimeout(() => {
        setMsg("");
      }, 5000);
      clearTimeout(timer);
    }
    if (res.status === 200) {
      setMsg("accepted");
    } else {
      throw new Error("error");
    }
  };
  
  return (
    <>
      {msg === "sameId" && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          The ID already exists! — <strong>Please try another ID</strong>
        </Alert>
      )}
      {msg === "accepted" && <LoggedInModal isMember={handleBack} />}
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
                setUserInfo((prev) => ({ ...prev, userId: e.target.value }));
              }}
              required
            />
            <TextField
              id="outlined-password"
              label="Password"
              color="warning"
              onChange={(e) => {
                setUserInfo((prev) => ({ ...prev, userPassword: e.target.value }));
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
                setUserInfo((prev) => ({ ...prev, firstName: e.target.value }));

              }}
              required
            />
            <TextField
              label="Last Name"
              variant="filled"
              color="success"
              required
              onChange={(e) => {
                setUserInfo((prev) => ({ ...prev, lastName: e.target.value }));
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
