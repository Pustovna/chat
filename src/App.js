import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Loader from "./components/Loader/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "./index";

const App = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
