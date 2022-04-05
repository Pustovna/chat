import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid, IconButton } from "@mui/material";
import { Context } from "../index";
import { TextField } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";

import firebase from "firebase/compat/app";
import { collection, getDocs, doc, deleteDoc, collectionGroup, onSnapshot, connectFirestoreEmulator } from "firebase/firestore";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  // const [messages, loading] = useCollectionData(
  //   firestore.collection("messages").orderBy("createAt")
  // );
  const [messages, setMesssages] = useState([])
  

  useEffect(
    () => 
    onSnapshot(collection(firestore, "messages"), (snapshot) => 
      setMesssages(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    ),
    []
  );

  const sendMessage = async () => {
    console.log('sendMessage')
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

  const deleteMessage = async (e, id) => {
    // const del = await deleteDoc(doc(firestore, "messages", "14iqDptS1g0LHmCvTelJ"));

    // const del = await collectionGroup(firestore, "messages");
    // console.log(firestore.collection('messages').docs);
    // const item = await onSnapshot(collection(firestore, "messages"), (snapshot) => {
    //   snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    // })
    // const idMessage = await e.target.getAttribute('iddb');
    // const idMessage = await this.getAttribute('iddb');
    // console.log(iddb);
    // 
    // console.log(messages.length)

    if (id) {
      deleteDoc(doc(firestore, "messages", id));
    } else {
      console.log('id not found')
    }
  };


  const firebaseGetData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "messages"));
    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const newItem = {data: doc.data(), id: doc.id}
     data.push(newItem);
    });

    return data;
  };

  // if (loading) {
  //   return <Loader />;
  // }

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
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                margin: 10,
                border:
                  user.uid === message.uid
                    ? "1px solid green"
                    : "1px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                width: "fit-content",
                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL}></Avatar>
                <div  >{message.text}</div>
                <IconButton onClick={(e) => {deleteMessage(e, message.id)}}>
                  <div
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    delete
                  </div>
                </IconButton>
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

