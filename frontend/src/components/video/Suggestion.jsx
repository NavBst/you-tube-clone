import React, { Suspense } from 'react'
import videoData from '../../utils/data'
import Loading from '../load/Loading';
const VideoCard = React.lazy(() => import('./VideoCard'))

const Suggestion = () => {
    const data = videoData;
    return (
        <div className='basis-[33%]'>
            {
                data.map((video, index) => {
                    return (
                        <div className='my-8' key={video.id}>
                            <Suspense fallback={<Loading />}>
                                <VideoCard video={video} />
                            </Suspense>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Suggestion