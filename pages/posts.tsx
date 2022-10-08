import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../src/components/context/LoggedInContext";

const Posts: NextPage = () => {
  const { userId, userAvatarColor } = useContext(LoggedInContext);
  const [userInformation, setUserInformation] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const getInfo = async () => {
      //   if (userId) {
      //     const res = await fetch(`/api/userInfo?userId=${userId}`, {
      //       method: "GET",
      //       headers: { "Content-Type": "application/json" },
      //     });
      //     const info = await res.json();
      //     setUserInformation({
      //       firstName: info.firstName,
      //       lastName: info.lastName,
      //     });
      //   }
      const res = await fetch(`/api/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
    };

    getInfo();
  }, [userId]);

  return <></>;
};

export default Posts;
