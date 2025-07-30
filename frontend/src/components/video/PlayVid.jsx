import axios from "axios";
import React, { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";

const PlayVid = ({ video }) => {
  const [showMore, setShowMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
//   const { uploadDate, title, views } = video;

  const handleLike = async () => {
    if (disliked) setDisliked(false);
    setIsLiked(!isLiked);
  };

  const handleDislike = () => {
    if (isLiked) setIsLiked(false);
    setDisliked(!disliked);
  };
  return (
    <div className="w-full">
      {/* ────── Video player ────── */}
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
        <video
          src={
            "https://videos.pexels.com/video-files/32730662/13953891_2560_1440_24fps.mp4"
          }
          controls
          autoPlay
          className="w-full h-full"
        />
      </div>

      {/* ────── Title & views ────── */}
      <h1 className="text-lg font-semibold mt-4">{'title'}</h1>
      <p className="text-sm text-slate-600 mt-1">
        {/* {views.toLocaleString()} views • {uploadDate} */}
      </p>

      {/* channel and action button  */}
      <div className="flex justify-between">
        {/* ────── Channel row ────── */}
        <div className="mt-4 flex items-start gap-4">
          <img
            src={'channelAvatar'}
            alt={'channelName'}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm">'channelName'</p>
            <button className="mt-1 px-4 py-1.5 text-sm rounded-full bg-slate-900 text-white hover:opacity-90">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex h-10  bg-slate-200 rounded-full">
            <button
              className="px-4 py-1.5 text-sm rounded-l-full hover:bg-slate-300 flex items-center after:content-none after:h-8 after:w-1 after:bg-amber-300 cursor-pointer"
              onClick={() => handleLike()}
            >
              {isLiked ? <AiFillLike /> : <AiOutlineLike />} 4.5k
            </button>
            <div className="w-[1px] h-6  bg-gray-400 self-center"></div>
            <button
              className="px-4 py-1.5 bg-slate-200 text-sm rounded-r-full hover:bg-slate-300 cursor-pointer"
              onClick={() => {
                handleDislike();
              }}
            >
              {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
            </button>
          </div>
          <button className=" h-10 flex justify-center items-center gap-4 px-6 bg-slate-200  text-sm rounded-full hover:bg-slate-300 cursor-pointer">
            <FaRegBookmark /> save
          </button>
          <button className="h-10 px-4 flex justify-center items-center bg-slate-200 text-sm rounded-full hover:bg-slate-300 cursor-pointer">
            🔁 Share
          </button>
        </div>
      </div>

      {/* ────── Description toggle ────── */}
      <div className="mt-4 text-sm whitespace-pre-line bg-slate-100 rounded-xl p-4">
        <p className={showMore ? "" : "line-clamp-3"}>description</p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-2 text-blue-600 hover:underline"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default PlayVid;
