import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VideoCard from '../video/VideoCard'
import { RiPlayListAddFill } from 'react-icons/ri'
import { MdNotifications, MdNotificationsNone } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { channels, videos } from '../../utils/api'
import ChannelForm from './ChannelForm'

const Channel = () => {
  const { id } = useParams()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasChannel, setHasChannel] = useState(false)
  const [channelData, setChannelData] = useState(null)
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true);
        if (!user) {
          navigate('/login');
          return;
        }
        const {data} = await channels.getMyChannel();
        // const { data } = await channels.getMyChannel();
        if (data.hasChannel) {
          setHasChannel(true);
          setChannelData(data.channel);
          
          // Fetch channel's videos
          const videosResponse = await videos.getAll({ channelId: data.channel._id });
          setVideos(videosResponse.data.videos);
        }
      } catch (err) {
        console.error('Error fetching channel:', err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [user, navigate]);

  // Videos will be fetched based on channel
  const [videos, setVideos] = useState([])

  // Fetch videos when channel data is available
  useEffect(() => {
    if (channelData?._id) {
      // Here you would fetch videos for this channel
      // For now using dummy data
      setVideos([
        {
          id: 1,
          title: "Build a Full Stack App with Next.js 13",
          thumbnail: "https://i.ytimg.com/vi/6h649f2fB9Q/hqdefault.jpg",
          views: "102K",
          channelName: channelData.name,
          channelAvatar: channelData.avatar
        }
      ]);
    }
  }, [channelData?._id])

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  const toggleNotification = () => {
    if (isSubscribed) {
      setShowNotification(!showNotification)
    }
  }

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!hasChannel) {
    return <ChannelForm onSuccess={() => setHasChannel(true)} />;
  }

  if (!channelData) {
    return <div>Error loading channel data</div>;
  }

  return (
    <div className="w-full">
      {/* Channel Banner */}
      <div className="w-full h-[200px] md:h-[300px] relative bg-gradient-to-r from-blue-500 to-purple-500">
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
              <p>{channelData?.subscribers || 0} subscribers • {channelData?.videos || 0} videos</p>
              <p className="line-clamp-2">{channelData?.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSubscribe}
              className={`px-4 py-2 rounded-full font-medium ${
                isSubscribed
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            {isSubscribed && (
              <button
                onClick={toggleNotification}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {showNotification ? (
                  <MdNotifications className="w-6 h-6" />
                ) : (
                  <MdNotificationsNone className="w-6 h-6" />
                )}
              </button>
            )}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Channel