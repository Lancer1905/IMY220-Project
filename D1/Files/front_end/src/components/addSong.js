// Pieter Venter u23896257
import React from "react";

export class AddSong extends React.Component {

    constructor(props){
        super(props);

        this.songName = React.createRef();
        this.songArtist = React.createRef();
        this.songLink = React.createRef();
        this.playRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e){
        e.preventDefault();

        const errors = {};

        const name = this.songName.current.value.trim();
        const artist = this.songArtist.current.value.trim();
        const link = this.songLink.current.value.trim();
        const playName = this.playRef.current.value;

        if (!name.trim()){
            errors.name = "Please make sure that you enter a song name";
        }
        if (!artist.trim()){
            errors.artist = "Please enter the artist's name";
        }
        if (!link.trim()){
            errors.link = "Please enter the link to the song";
        }

        if (Object.keys(errors).length > 0){
            alert(JSON.stringify(errors));
            return;
        } else {
            this.props.onSongAdd(name, artist, link, playName);
        }
    }

    render(){
        return (
            <div className="home-div">
                <h1 className="home-h2">Add a song:</h1>
                <form className="add-song-div" onSubmit={this.handleSubmit}>
                    <div className="profile-data-div">
                        <label className="profile-label">Song name: </label>
                        <input className="profile-input" ref={this.songName} type="text" placeholder="Enter song name"></input>
                    </div>
                    <div className="profile-data-div">
                        <label className="profile-label">Song artist: </label>
                        <input className="profile-input" ref={this.songArtist} type="text" placeholder="Enter artist name"></input>
                    </div>
                    <div className="profile-data-div">
                        <label className="profile-label">Song link: </label>
                        <input className="profile-input" ref={this.songLink} type="text" placeholder="Enter song Link"></input>
                    </div>
                    <div className="profile-data-div">
                        <label className="profile-label">Choose where to place song:</label>
                        <select className="playlist-option" ref={this.playRef}>
                            <option value='none'>All songs</option>
                            {this.props.playlists ? 
                                this.props.playlists.map(p => {
                                    return <option value={p.name}>{p.name}</option>
                                })
                                :null
                            }
                        </select>
                    </div>                    
                    <button className="add-btn" type='submit'>Add song</button>
                </form>  
            </div>
        );
    }
}