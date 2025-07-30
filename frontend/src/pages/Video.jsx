import React, { Suspense, useEffect, useMemo, useState } from "react";
import videoData from "../utils/data";
import { useParams } from "react-router-dom";
const PlayVid = React.lazy(() => import("../components/video/PlayVid"));
import Suggestion from "../components/video/Suggestion";
import axios from "axios";
import Loading from "../components/load/Loading";

const Video = () => {
  const [video, setVideo] = useState(null);
  const { id } = useParams();
  console.log(id);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/videos");
        const vids = res.data;
        setVideos(vids);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = videos.filter((vid) => vid._id == id);
    setVideo(filtered[0]);
    console.log(filtered);
  }, [videos]); // This will run whenever videos state changes

  return (
    <div className="flex px-4 gap-4">
      {!video ? <Loading /> : <PlayVid video={video} />}

      <Suggestion />
    </div>
  );
};

export default Video;
