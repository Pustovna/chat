import React from "react";
import { Container, Grid } from "@mui/material";
import styles from "./loader.module.css";


const Loader = () => {
  return (
    <Container>
      <Grid container className={styles.container}>
        <Grid container className={styles.lds__wrap}>
          <div className={styles.lds__hourglass}></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Loader;
