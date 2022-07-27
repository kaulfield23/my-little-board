import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import type { NextPage } from "next";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f89955" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
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
              My little board
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Log in">
                <IconButton sx={{ p: 0 }}>
                  <AccountCircle />
                  <Typography
                    sx={{
                      ml: 1,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: "inherit",
                      fontSize: { xs: "1rem", md: "1.5rem" },
                    }}
                    component="a"
                    href="/login"
                  >
                    Log in
                  </Typography>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
