import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import VideoCard from "../video/VideoCard";
import { MdNotifications, MdNotificationsNone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { channels, videoService } from "../../utils/api";
import { updatechannel } from "../../store/authSlice";

const MyChannel = ({ channelList }) => {
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const id = channelList._id;

  const navigate = useNavigate();
  useEffect(() => {
        dispatch(updatechannel(channelList))
        setChannelData(channelList);
        setLoading(false);
  }, [user, navigate]);

  // Videos will be fetched based on channel
  const [videos, setVideos] = useState([]);

  // Fetch videos when channel data is available
  useEffect(() => {
    async function getVids() {
      try {
        const res = await videoService.getAll();
        console.log(res)
        const vids  = res.data;
        const filtered  =  vids.filter((vid)=> vid.channelId === id)
        setVideos(filtered);
        console.log(filtered)
        setLoading(false);
      } catch (er) {
        console.log(er);
      }
    }
    getVids();
  }, [channelData]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!channelData) {
    return <div>Error loading channel data</div>;
  }

  return (
    <div className="w-full">
      {/* Channel Banner */}
      <div className="w-full h-[100px] md:h-[200px] relative bg-gradient-to-r from-blue-500 to-purple-500">
        {channelData?.banner && (
          <img
            src={channelData.banner}
            alt="channel banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Channel Info Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4">
          {/* Channel Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32">
            <img
              src={channelData.avatar}
              alt="channel avatar"
              className="w-full h-full rounded-full"
            />
          </div>

          {/* Channel Details */}
          <div className="flex-grow">
            <h1 className="text-2xl font-bold">{channelData?.name}</h1>
            <div className="text-gray-600 text-sm space-y-1">
              <p>{channelData?.handle}</p>
              <p>
                {channelData?.subscribers || 0} subscribers •{" "}
                {channelData?.videos || 0} videos
              </p>
              <p className="line-clamp-2">{channelData?.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              // onClick={toggleNotification}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {showNotification ? (
                <MdNotifications className="w-6 h-6" />
              ) : (
                <MdNotificationsNone className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b mb-4">
          <nav className="flex gap-6">
            <button className="px-3 py-2 border-b-2 border-black font-medium">
              Videos
            </button>
            <button className="px-3 py-2 text-gray-600 hover:text-black">
              Playlists
            </button>
            <button className="px-3 py-2 text-gray-600 hover:text-black">
              Community
            </button>
            <button className="px-3 py-2 text-gray-600 hover:text-black">
              About
            </button>
          </nav>
        </div>

        {/* Videos Grid */}
        {videos.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Link
              to={"/add-vid"}
              className="p-4 w-12 h-12 rounded-full border flex-center font-bold text-2xl cursor-pointer transition-transform active:scale-95 duration-300"
            >
              +
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyChannel;
