import React from "react";
import ReactDOM from "react-dom/client";
import Brand from "./screen/brand/Brand";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Splash from "./screen/splash/Splash";
import App from "./App";
import MainMenu from "./screen/main-menu/MainMenu";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Brand />,
  },
  {
    path: "/splash",
    element: <Splash />,
  },
  {
    path: "/main-menu",
    element: <MainMenu />,
  },
  {
    path: "/app",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
