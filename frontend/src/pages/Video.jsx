import React, { useEffect, useMemo, useState } from "react";
import videoData from "../utils/data";
import { useParams } from "react-router-dom";
import PlayVid from "../components/video/PlayVid";
import Suggestion from "../components/video/Suggestion";
import axios from "axios";

const Video = () => {
  const [video, setVideo] = useState(null);
  // const vids = videoData;
  const { id } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/videos");
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = videos.filter(vid => vid._i = id);
    console.log(filtered);
    setVideo(filtered)
}, [videos]); // This will run whenever videos state changes

  return (
    <div className="flex px-4 gap-4">
      <PlayVid video={video} />
      {/* <Suggestion/> */}
    </div>
  );
};

export default Video;
