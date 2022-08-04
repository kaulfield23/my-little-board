import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../src/components/context/LoggedInContext";

const Profile: NextPage = () => {
  const { userId, userAvatarColor } = useContext(LoggedInContext);
  const [userInformation, setUserInformation] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const getInfo = async () => {
      if (userId) {
        const res = await fetch(`/api/userInfo?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const info = await res.json();
        setUserInformation({
          firstName: info.firstName,
          lastName: info.lastName,
        });
      }
    };

    getInfo();
  }, [userId]);

  return (
    <>
      <Typography sx={{ textAlign: "center", mt: 5, fontSize: "2rem" }}>
        My profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: { xs: "300px", md: "800px" },
          margin: "80px auto",
          fontFamily: "monospace",
          backgroundColor: "beige",
          padding: { xs: "50px", md: "100px" },
        }}
      >
        <Avatar
          sx={{
            bgcolor: `${userAvatarColor}`,
            marginRight: { xs: "40px", md: "100px" },
          }}
          alt="Remy Sharp"
        >
          {userId.charAt(0)}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {["First Name", "Last Name"].map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  textAlign: "center",
                  mb: 1,
                  p: 1,
                  border: "1px grey solid",
                  borderRadius: "6px",
                }}
              >
                <Typography>
                  {item} :{" "}
                  {item === "First Name"
                    ? userInformation.firstName
                    : userInformation.lastName}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
