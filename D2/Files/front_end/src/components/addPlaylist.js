// Pieter Venter u23896257
import React from "react";

export class AddPlaylist extends React.Component {

    constructor(props){
        super(props);

        this.playName = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const playName = this.playName.current.value;

        this.props.onCreatePlay(playName);
    }

    render(){
        return (
            <div className="home-div">
                <h1 className="home-h2">Create a playlist:</h1>
                <form className="add-song-div" onSubmit={this.handleSubmit}>
                    <div className="profile-data-div">
                        <label className="profile-label">Playlist name: </label>
                        <input className="profile-input" ref={this.playName} type="text" placeholder="Enter playlist name"></input>
                    </div>
                    <button className="add-btn" type='submit'>Create playlist</button>
                </form>
            </div>
        );
    }
}