import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import "./styles/gobal.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Single from "./Pages/Single";
import Write from "./Pages/Write";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import User_Posts from "./Components/User_Posts";

function App() {
  const Layout = () => {
    return (
      <>
        <div className="app_container">
          <Header />
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/post/:id",
          element: <Single />,
        },
        {
          path: "/write",
          element: <Write />,
        },
        {
          path: "/user/posts",
          element: <User_Posts/>
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <div>Page Error</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
