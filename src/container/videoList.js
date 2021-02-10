import React from 'react';
import VideoItem from '../components/videoItem';


const VideoList = (props) => {
    const movieList = props.movieList;
    // console.log('---je suis la liste----', movieList);

    return(
        <div className="rightside">
            <h1>POPULAIRES</h1>
            <ul className="videolist">
                {movieList.map(movie => {       
                    return <VideoItem key={movie.id} movie={movie} title={movie.title} image={movie.poster_path} callBack={receiveMovie} />
                })}
            </ul>
        </div>
    )
    function receiveMovie(movie){
        // console.log('--click parent--', movie);
        props.callBack(movie)
    }
}

export default VideoList;
