import React, { useEffect, useMemo, useState } from 'react'
import videoData from '../utils/data';
import { useParams } from 'react-router-dom';
import PlayVid from '../components/video/PlayVid';
import Suggestion from '../components/video/Suggestion';

const Video = () => {
    const [video, setVideo] = useState(null);
    const vids = videoData;
    const {id} = useParams();
    useMemo(()=>{
        const filtered = vids.filter((vid)=>vid.id === id);
        setVideo(filtered);
    }, [])
  return (
    <div className='flex px-4 gap-4'>
        <PlayVid vid={video}/>
        <Suggestion/>
    </div>
  )
}

export default Video