import React from 'react';
import VideoItem from '../components/videoItem';


const VideoList = (props) => {
    const movieList = props.movieList;
    const previewVideo = props.previewVideo;
    const title = props.title

    return(
        <div className="rightside">
            <h1>{title}</h1>
            <ul className="videolist">
                {movieList.map(movie => {       
                    return <VideoItem 
                                key={movie.id} 
                                movie={movie} 
                                title={movie.title} 
                                image={movie.poster_path} 
                                callBack={receiveMovie}
                                previewVideo={previewVideo}
                                preview={receivePreview}
                            />
                })}
            </ul>
        </div>
    )
    function receiveMovie(movie){
        props.callBack(movie);
    }

    function receivePreview(movie){
        props.preview(movie);
    }
}

export default VideoList;
