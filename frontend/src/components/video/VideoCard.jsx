import { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";
import { channels } from "../../utils/api";

const VideoCard = ({ video }) => {
  const [channel, setChannel] = useState(null);
  console.log(video);
  useEffect(() => {
    async function getChannel() {
      const res = await channels.getByHandle(video.channelId);
      console.log(res.data);
      setChannel(res.data);
    }
    getChannel();
  }, []);
  return (
    <div className="w-full  shadow-lg rounded-lg cursor-pointer">
      <Link to={`/video/${video._id}`}>
        <img
          src={video.thumbnailUrl}
          alt="thumbnail"
          className="w-full h-[150px] rounded-t-lg"
        />
      </Link>
      <div className="flex p-2 justify-between items-start">
        <Link to={`channels/${video.channelId}`} className="basis-[20%] ">
          <img
            src={!channel ? "" : channel.avatar}
            alt=""
            className="rounded-full w-12 h-12"
          />
        </Link>
        <div className="basis-[80%]">
          <div className="flex justify-between items-start gap-2">
            {/* vid title  */}
            <h3 className="font-bold text-sm">{video.title}</h3>
            <button className="rounded-full cursor-pointer transition-all duration-100 active:bg-gray-200 p-3">
              <SlOptionsVertical />
            </button>
          </div>
          <div className="text-xs py-2">
            <h3 className="">{video.channelName}</h3>
            <p className="">{video.views} views &middot; 5 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
