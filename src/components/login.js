import React from "react";
import { useContext } from "react";
import { Context } from "../index";
import { Button, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const { auth } = useContext(Context);

  const login = () => {
    const provider = new GoogleAuthProvider();
    let { user } = {};
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        // ...
      });
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justifyContent="center"
      >
        <Grid
          style={{ width: 400, background: "lightgray", borderRadius: "20px" }}
          container
          alignItems={"center"}
          direction={"column"}
        >
          <Box p={5}>
            <Button onClick={login} variant={"outlined"}>
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
