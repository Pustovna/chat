import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid } from "@mui/material";
import { Context } from "../index";
import { TextField } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";

import firebase from "firebase/compat/app";
import { collection, getDocs } from "firebase/firestore";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createAt")
  );

  const sendMessage = async () => {
    if (value !== "") {
      firebaseSendMessage();
      setValue("");
    } else {
      return null;
    }
  };

  const firebaseSendMessage = () => {
    return firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const firebaseGetData = async () => {
    console.log("start");
    const querySnapshot = await getDocs(collection(firestore, "messages"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data().text);
    });
    console.log("stop");
  };

  firebaseGetData();

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        justify={"center"}
        style={{ height: window.innerHeight - 50, marginTop: 20 }}
      >
        <div
          style={{
            width: "80%",
            height: "60vh",
            border: "1px solid gray",
            overflowY: "auto",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                margin: 10,
                border:
                  user.uid === message.uid
                    ? "2px solid green"
                    : "2px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                width: "fit-content",
                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL}></Avatar>
                <div>{message.text}</div>
              </Grid>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            fullWidth
            variant={"outlined"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></TextField>
          <Button onClick={sendMessage} variant={"outlined"}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
