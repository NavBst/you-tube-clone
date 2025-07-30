import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { load, update } from "../store/authSlice";
import Channel from "./channel/Channel";
import ChannelForm from "./channel/ChannelForm";
import MyChannel from "./channel/MyChannel";
import { useEffect, useState } from "react";
import { channels } from "../utils/api";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState(null);
   const [channelLoading, setChannelLoading] = useState(true);

  const { user, loading } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     dispatch(update(JSON.parse(storedUser)));
  //   }
  // }, []);

  useEffect(() => {
    if (!user) {
      setChannel(null);
      setChannelLoading(false); // No channel fetch needed
      return;
    }
    async function fetchChannel() {
      setChannelLoading(true);
      try {
        const res = await channels.getMyChannel();
        setChannel(res.data.channel); // This is a channel object
      } catch (error) {
        console.error("Failed to fetch channel:", error);
        setChannel(null);
      } finally {
        setChannelLoading(false);
      }
    }
    fetchChannel();
  }, [user]);

   if (loading || channelLoading) {
    return <div>Loading...</div>;
  }
  console.log(channel)
  if (channel) {
    // dispatch(load(false));
    return <MyChannel channelList={channel} />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <ChannelForm />;
};

export default ProtectedRoute;
