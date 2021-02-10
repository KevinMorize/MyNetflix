import React from 'react';

const VideoSynopsis = (props) => {
    const title = props.title;
    const overview = props.overview;
    const date = props.release_date;

    return(
        <div className="synopsis">
            <h1>{title}</h1>
            <p>{overview}</p>
            <p>Date de réalisation: {date}</p>
        </div>
    )
}

export default VideoSynopsis; 