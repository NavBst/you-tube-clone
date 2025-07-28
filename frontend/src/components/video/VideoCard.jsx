import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";


const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video.id}`}>
      <div className="w-full  shadow-lg rounded-lg cursor-pointer">
        <img
          src={video.thumbnail}
          alt="thumbnail"
          className="w-full h-[150px] rounded-t-lg"
        />
        <div className="flex p-2 justify-between items-start gap-2">
          <div>
            <img src={video.channelAvatar} alt="" className="rounded-full" />
          </div>
          <div>
            <div className="flex justify-between items-start gap-2">
              {/* vid title  */}
              <h3 className="font-bold text-sm">{video.title}</h3>
              <button className="rounded-full cursor-pointer transition-all duration-100 active:bg-gray-200 p-3">
                <SlOptionsVertical />
              </button>
            </div>
            <div className="text-xs py-2">
              <h3 className="">{video.channelName}</h3>
              <p className="">{video.views  } views &middot; 5 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
