import React from 'react';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

const VideoItem = (props) => {
    const movie = props.movie;
    // console.log('----je suis item----', movie);

    return (
        <div className="videoitem flip-box-front" onClick={handleClick}>
            <li>
                {movie.title}
            </li>
            <img src={`${IMG_URL}${movie.poster_path}`} alt="poster_path"/>
        </div>     
    )

    function handleClick() {
        // console.log('---click item---', movie);
        props.callBack(movie)
    }
}

export default VideoItem;