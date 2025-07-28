import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
const Home = React.lazy(() => import("./pages/Home.jsx"));
import AuthLayout from "./layouts/AuthLayout.jsx";
import SignIn from "./pages/SignIn.jsx";
import Video from "./pages/Video.jsx";
import Channel from "./components/channel/Channel.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "/video/:id", element: <Video /> },
          { path: "/channel", element: <Channel /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [{ index: true, element: <SignIn /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes}>
    <App />
  </RouterProvider>
);
