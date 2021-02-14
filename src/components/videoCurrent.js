import React from 'react'

const YOUTUBE_URL = 'https://www.youtube.com/embed/'

const VideoCurrent = (props) =>{
    
    const videoId = props.videoId;
    return(
        <div className="videocurrent">
            <iframe src={`${YOUTUBE_URL}${videoId}`} />
        </div>
    )
}

export default VideoCurrent;
