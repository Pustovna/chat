import React from "react";
import { Button, Container, Grid } from "@mui/material";

const Loader = () => {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alugnItems={"center"}
        justify={"center"}
      >
        <Grid container alignItems={"center"} direction={"column"}>
          <div className="lds-hourglass"></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Loader;
