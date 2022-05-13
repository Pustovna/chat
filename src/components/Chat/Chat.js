import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid, IconButton } from "@mui/material";
import { Context } from "../../index";

import { TextField } from "@mui/material";
import styles from "./chat.module.css";

// import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "../Loader/Loader";

// import firebase from "firebase/compat/app";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query
} from "firebase/firestore";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  // const [messages, loading] = useCollectionData(
  //   firestore.collection("messages").orderBy("createAt")
  // );
  const [messages, setMesssages] = useState();

  useEffect(
    () => {
      const collectionRef = collection(firestore, "messages");
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      

      const unsub = onSnapshot(q, (snapshot) => 
      setMesssages(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      ))

      return unsub;
    },[]
  );

  const sendMessage = () => {
    if (value !== "") {
      firebaseSendMessage();
      setValue("");
    } else {
      return null;
    }
  };

  const firebaseSendMessage = async () => {
    // return firestore.collection("messages").add({
    //   uid: user.uid,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   text: value,
    //   createAt: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    const collectionRef = collection(firestore, "messages");
    const payload = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      timestamp: serverTimestamp()
    };

    return await addDoc(collectionRef, payload);
  };

  const deleteMessage = async (e, id) => {
    if (id) {
      deleteDoc(doc(firestore, "messages", id));
    } else {
      console.log("id not found");
    }
  };

  const firebaseGetData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "messages"));
    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const newItem = { data: doc.data(), id: doc.id };
      data.push(newItem);
    });

    return data;
  };

  const checkSender = (user, message) => {
    if (user === message) {
      return styles.item__self;
    } else {
      return styles.item__other;
    }
  };

  if (!messages) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid container className={styles.container}>
        <div className={styles.messages__wrap}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={checkSender(user.uid, message.uid)}
            >
              <Grid container>
                <Avatar src={message.photoURL}></Avatar>
                <div>{message.text}</div>
                <IconButton
                  onClick={(e) => {
                    deleteMessage(e, message.id);
                  }}
                >
                  <div className={styles.delete}>delete</div>
                </IconButton>
              </Grid>
            </div>
          ))}
        </div>
        <Grid container className={styles.input__wrap}>
          <TextField
            fullWidth
            variant={"outlined"}
            label="Your message"
            value={value}
            multiline
            rows={2}
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
