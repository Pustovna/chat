import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";

const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  console.log(user);

  return (
    <Routes>
      {user
        ? privateRoutes.map(({ path, Element, toPath }) => (
            <Route
              key={path}
              path={path}
              element={<Element to={toPath ? toPath : ""} />}
            />
          ))
        : publicRoutes.map(({ path, Element, toPath }) => (
            <Route
              key={path}
              path={path}
              element={<Element to={toPath ? toPath : ""} />}
            />
          ))}
    </Routes>
  );
};

export default AppRouter;
