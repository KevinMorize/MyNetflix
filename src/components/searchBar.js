import React, { Component } from 'react';

class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {placeHolder: "Tapez votre film ...", searchText:''}
    }

    render(){
        return(
            <div className="searchbar input-group">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
                <span className="input-group-btn">
                    <button className="btn" onClick={this.handleClick.bind(this)}>Go</button>
                </span>
            </div>
        )
    } 
    
    handleChange(event){
        this.setState({ searchText: event.target.value });
    }

    handleClick(){
        this.props.callBack(this.state.searchText);
    }
}

export default SearchBar;
