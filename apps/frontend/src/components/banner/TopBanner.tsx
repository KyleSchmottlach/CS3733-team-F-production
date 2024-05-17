import { AppBar, IconButton, Stack, Toolbar, styled } from "@mui/material";
import React from "react";
import bwhLogo from "frontend/src/images/bwh-logo.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar.tsx";
import { Link } from "react-router-dom";
import NavBar from "../navMenu/NavBar.tsx";
import LoginButton from "../auth0/LoginButton.tsx";
import CurrentTime from "../banner/Time.tsx";
import WeatherApp from "./WeatherApp.tsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const LogoIconButton = styled("button")({
  cursor: "pointer",
  background: "transparent",
  border: "none",
  outline: "none",
  "&:active": {
    outline: "none",
  },
  "&:hover": {
    background: "transparent",
  },
});

function TopBanner() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        height: "120px",
        elevation: 1,
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Toolbar>
        <Stack direction="row" spacing={2.5} sx={{  alignItems: "center",  color: "#012D5A", marginRight: "1%" }}>
          <NavBar />

          <Link to="/">
            <LogoIconButton as="span" color="inherit" aria-label="logo">
              <img
                src={bwhLogo}
                style={{
                  display: "flex",
                  width: "100%", // Set the width to 100%
                  minHeight: "100%",
                  minWidth: "250px",
                  maxWidth: "450px", // Add a max-width for responsiveness
                  alignItems: "center",
                }}
                alt="bwh logo"
              />
            </LogoIconButton>
          </Link>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          sx={{ textAlign: "center", marginRight: "1%", minWidth: "200px" }}
        >
          <CurrentTime />
          <WeatherApp />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ textAlign: "right", marginRight: "1%" }}
        >
          <SearchBar />
          {/* Replace Sign In button and profile button with LoginButton */}
          <LoginButton />
          <Link to="/">
            <IconButton
              sx={{ color: "#012D5A" }}
              size="large"
              aria-label="account of current user"
            >
              <AccountCircle />
            </IconButton>
          </Link>
          <Link to={"/Cart"}>
            <IconButton
              sx={{ color: "#012D5A" }}
              size="large"
              aria-label="cart of current user"
            >
              <ShoppingCartIcon />
            </IconButton>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default TopBanner;
