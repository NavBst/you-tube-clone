import { Suspense, useEffect, useState } from "react";
import React from "react";
import Loading from "../components/load/Loading";
import videoData from "../utils/data";
import axios from "axios";

const VideoCard = React.lazy(() => import("../components/video/VideoCard"));

const Home = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/videos");
        setVideo(res.data); 
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchVideos();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
        {video.map((video, index) => {
          return (
            <Suspense fallback={<Loading />} key={video._id} >
              <VideoCard video={video}  />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
