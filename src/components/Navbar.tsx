import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useRadioGroup,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "./context/LoggedInContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { dataAccountSearch } from "../util/dataSearch";

const Navbar = () => {
  const { isLoggedIn, userId, changeLoggedInState } =
    useContext(LoggedInContext);
  // const [userName, setUserName] = useState("");
  const [avatarColor, setAvatarColor] = useState("");

  const router = useRouter();
  const handleLogOut = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      changeLoggedInState(false, "");
      router.push("/");
    } else {
      alert("log out error! try again");
    }
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const query = "SELECT * FROM useraccounts WHERE userid=$1";
      const res = await fetch(`/api/userInfo?query=${query}&userId=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
    };

    getUserInfo();
  }, [isLoggedIn, userId]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f89955" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Link href="/">
              <Typography
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                }}
              >
                My Board
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Tooltip title={isLoggedIn ? "Profile" : "Log in"}>
                <IconButton sx={{ p: 0 }}>
                  <AccountCircle />
                  <Link href={isLoggedIn ? "/profile" : "/login"}>
                    <Typography
                      sx={{
                        ml: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: "inherit",
                        fontSize: { xs: "1rem", md: "1.5rem" },
                      }}
                      component="a"
                    >
                      {isLoggedIn ? "Profile" : "Log in"}
                    </Typography>
                  </Link>
                </IconButton>
              </Tooltip>
              {isLoggedIn && (
                <Tooltip title="Log out">
                  <IconButton onClick={handleLogOut}>
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        color: "white",
                        backgroundColor: "#c56161",
                        p: 1,
                        borderRadius: "5px",
                        fontSize: { xs: "1rem", md: "1.5rem" },
                        ml: 2,
                      }}
                    >
                      Log out
                    </Typography>
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
