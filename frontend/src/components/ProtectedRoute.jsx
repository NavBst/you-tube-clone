import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load, update } from "../store/authSlice";
import Channel from "./channel/Channel";
import ChannelForm from "./channel/ChannelForm";
import MyChannel from "./channel/MyChannel";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(update(JSON.parse(localStorage.getItem("user"))));
  }, [dispatch]);
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (user.channels.length > 0) {
    dispatch(load(false));
    return <MyChannel channelList={user.channels} />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log("first");
  return <ChannelForm />;
};

export default ProtectedRoute;
