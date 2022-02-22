import ReactDOM from "react-dom";
import { createContext } from "react";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCyB4RhvGU7j4FsCy8RkcW2WF9_GmHQgbU",
  authDomain: "first-chat-710e4.firebaseapp.com",
  projectId: "first-chat-710e4",
  storageBucket: "first-chat-710e4.appspot.com",
  messagingSenderId: "215207400304",
  appId: "1:215207400304:web:7eab2956812e9f7f0e35b5",
  measurementId: "G-4GHDJR8GLS",
});

export const Context = createContext(null);

const auth = getAuth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Context.Provider
    value={{
      firebase,
      auth,
      firestore,
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
