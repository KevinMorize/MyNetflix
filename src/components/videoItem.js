import React, { useState } from 'react';

const YOUTUBE_URL = 'https://www.youtube.com/embed/'
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

const VideoItem = (props) => {
    const movie = props.movie;
    const previewVideo = props.previewVideo;
    const [hover, setHover] = useState(false);

    return (
        <>
        {!hover 
            ?<div 
                className="videoitem" 
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                
            >
                <li>
                    {movie.title}
                </li>
                <img src={`${IMG_URL}${movie.poster_path}`} alt="poster_path"/>
            </div> 
            :
            <div className="videoiframe" onMouseLeave={handleLeaveMouse}>
                <p onClick={handleClick}>Voir dans le lecteur</p>
                <iframe src={`${YOUTUBE_URL}${previewVideo.videoId}`} />
            </div>  
        }
        </>
    )

    function handleClick() {

        props.callBack(movie)
    }
 
    function handleMouseEnter(){
        setTimeout(() =>
        setHover(true), 500);
        props.preview(movie)
    }

    function handleLeaveMouse() {
        setTimeout(() =>
        setHover(false), 400);
    }
}

export default VideoItem;