import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
const Home = React.lazy(() => import("./pages/Home.jsx"));
import AuthLayout from "./layouts/AuthLayout.jsx";
import Login from "./components/forms/Login.jsx";
import Register from "./components/forms/Register.jsx";
import Video from "./pages/Video.jsx";
const Channel = React.lazy(() => import("./components/channel/Channel.jsx"));
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import ChannelForm from "./components/channel/ChannelForm.jsx";
import Loading from "./components/load/Loading.jsx";
import AddVid from "./components/forms/AddVid.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
          { path: "video/:id", element: <Video /> },
          {
            path: "channel",
            element: (
              <ProtectedRoute/>
            ),
          },
          {
            path: "add-vid",
            element: (
                  <AddVid />
            ),
          },
          {
            path: "channels/:id",
            element: (
                  <Channel />
            ),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <RouterProvider router={routes} />
//   </Provider>
// );
