import axios from 'axios';
import React from 'react';
import SearchBar from '../components/searchBar';
import VideoList from './videoList';
import VideoSynopsis from "../components/videoSynopsis";
import VideoCurrent from "../components/videoCurrent";

const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIE_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images';
const API_KEY = 'api_key=b1bb009f89a909c0ae0b65bc17104e0e';
const SEARCH_URL = 'search/movie?language=fr&include_adult=false';

class App extends React.Component {

    constructor(props) {
      super(props);
      this.state= {
        movieList: {}, 
        currentMovie: {},
        titleList: "Populaires",
        previewMovieList: {},
      };
    }

    componentWillMount(){
      this.getAxiosRes();
    }

    getAxiosRes() {
      axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`).then(function(res) {
        this.setState({ 
          movieList: res.data.results.slice(1, 7), 
          currentMovie: res.data.results[0] }, 
          function () {
            this.getAxiosVideo();
          }
        );
      }.bind(this));
    }

    getAxiosVideo() {
      axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function(response) {


        if (response.data.videos && response.data.videos.results[0]){
          const youtubeId = response.data.videos.results[0].key;
          let newCurrentMovie = this.state.currentMovie
          newCurrentMovie.videoId = youtubeId;
          console.log('putin--------');
          this.setState({currentMovie: newCurrentMovie, noVideo:''});
          this.setRecommend();
        }else {
          this.setState({ noVideo: 'Video indisponible !!!'});
        }  
      }.bind(this));   
    }

    getAxiosPreview() {
      axios.get(`${API_END_POINT}movie/${this.state.previewMovieList.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function(response) {

        if (response.data.videos && response.data.videos.results[0]){
          const youtubeId = response.data.videos.results[0].key;
          let newCurrentMovie = this.state.previewMovieList;
          newCurrentMovie.videoId = youtubeId;
          this.setState({previewMovieList: newCurrentMovie, noVideo:''});
        }else {
          this.setState({ noVideo: 'Video indisponible !!!'});
        }  
      }.bind(this));   
    }
    
    onClickListItem(movie) {
      this.setState({currentMovie: movie}, () => {this.getAxiosVideo();})
      this.setState({titleList: "Recommandés"})
    }

    onMouseHoverListItem(preview){
      this.setState({previewMovieList: preview}, () => {
        this.getAxiosPreview();
      })
    }

    getTextSearch(textSearch) {
      axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${textSearch}`).then(function(reponse){
        if (reponse.data && reponse.data.results[0]) {
          if (reponse.data.results[0].id != this.state.currentMovie.id){
            this.setState({ currentMovie: reponse.data.results[0] }, () => {
              this.getAxiosVideo();
              this.setRecommend();
            })
          }        
        };
      }.bind(this))
    }

    setRecommend() {
      axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function(reponse){
        this.setState({ movieList: reponse.data.results.slice(0, 6)});
      }.bind(this));
    }

    render() {

      const renderMovieList = () => {
        if (this.state.movieList.length >= 6) {
          return  <VideoList previewVideo={this.state.previewMovieList} preview={this.onMouseHoverListItem.bind(this)} movieList={this.state.movieList} callBack={this.onClickListItem.bind(this)} title={this.state.titleList} />
        }
      }

      const renderNoVideo = () => {
        if (this.state.noVideo != ''){
          return <h1 className="novideo">{this.state.noVideo}</h1>
        }
      }

      return (
        <div className="main">
          <img src="https://www.serieously.com/wp-content/uploads/2019/04/netflixlogo.png" className="justify-center logo" />
          <SearchBar callBack={this.getTextSearch.bind(this)} />
          <VideoCurrent videoId={this.state.currentMovie.videoId} />
          {renderNoVideo()}
          <VideoSynopsis title={this.state.currentMovie.title} overview={this.state.currentMovie.overview} release_date={this.state.currentMovie.release_date} />
          {renderMovieList()}        
        </div>
      )
    }
}

export default App; 