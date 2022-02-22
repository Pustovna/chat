import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

const Navbar = () => {
  const user = true;

  return (
    <AppBar color={"inherit"} position="static">
      <Toolbar variant={"dense"}>
        <Grid container justifyContent="flex-end">
          {user ? (
            <Button variant={"outlined"}>Выйти</Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button variant={"outlined"}>Логин</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
