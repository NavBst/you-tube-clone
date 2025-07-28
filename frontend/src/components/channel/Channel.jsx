import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '../video/VideoCard'
import { RiPlayListAddFill } from 'react-icons/ri'
import { MdNotifications, MdNotificationsNone } from 'react-icons/md'

const Channel = () => {
  const { channelId } = useParams()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  // Temporary channel data (replace with actual data fetch)
  const channelData = {
    name: "Code With Antonio",
    handle: "@codeWithAntonio",
    subscribers: "1.2M",
    videos: "234",
    description: "Welcome to Code With Antonio! Here you'll find tutorials and tips about web development, focusing on modern technologies like React, Next.js, and more.",
    avatar: "https://yt3.googleusercontent.com/FjeN785fVWx0Pr6xCbwPhhq8hHj_gocc3FygDXYDEQgp2gE_FQzRNsFHFAjQ3oE-VJaeGR1a=s176-c-k-c0x00ffffff-no-rj",
    banner: "https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AeFd3m5-4fdY2hEaKof3Byp8VruZ0f0DQEA=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
  }

  // Temporary videos data (replace with actual data fetch)
  const videos = [
    {
      id: 1,
      title: "Build a Full Stack App with Next.js 13",
      thumbnail: "https://i.ytimg.com/vi/6h649f2fB9Q/hqdefault.jpg",
      views: "102K",
      channelName: channelData.name,
      channelAvatar: channelData.avatar
    },
    {
      id: 2,
      title: "React Authentication Tutorial",
      thumbnail: "https://i.ytimg.com/vi/PGPGcKBpXqQ/hqdefault.jpg",
      views: "84K",
      channelName: channelData.name,
      channelAvatar: channelData.avatar
    },
    {
      id: 3,
      title: "Build a Netflix Clone with React",
      thumbnail: "https://i.ytimg.com/vi/mqUN4N2q8Ag/hqdefault.jpg",
      views: "156K",
      channelName: channelData.name,
      channelAvatar: channelData.avatar
    },
    // Add more videos as needed
  ]

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  const toggleNotification = () => {
    if (isSubscribed) {
      setShowNotification(!showNotification)
    }
  }

  return (
    <div className="w-full">
      {/* Channel Banner */}
      <div className="w-full h-[200px] md:h-[300px] relative">
        <img
          src={channelData.banner}
          alt="channel banner"
          className="w-full h-full object-cover"
        />
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
            <h1 className="text-2xl font-bold">{channelData.name}</h1>
            <div className="text-gray-600 text-sm space-y-1">
              <p>{channelData.handle}</p>
              <p>{channelData.subscribers} subscribers • {channelData.videos} videos</p>
              <p className="line-clamp-2">{channelData.description}</p>
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