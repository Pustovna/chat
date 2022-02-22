import { LOGIN_ROUTE, CHAT_ROUTE } from "./utils/consts";
import Login from "./components/login";
import Chat from "./components/Chat";
import { Navigate } from "react-router-dom";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Element: Login,
  },
  {
    path: "*",
    Element: Navigate,
    toPath: LOGIN_ROUTE,
  },
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    Element: Chat,
  },
  {
    path: "*",
    Element: Navigate,
    toPath: CHAT_ROUTE,
  },
];
