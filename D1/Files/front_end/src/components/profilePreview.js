// Pieter Venter u23896257
import React from "react";
import { Follow } from "./follow";
import { Song } from "./song";
import { Playlist } from "./playlist";

export class ProfilePreview extends React.Component {

    constructor(props) {
        super(props);

        this.togglePlaylistView = this.togglePlaylistView.bind(this);
        this.toggleShowSongs = this.toggleShowSongs.bind(this);

        this.state = {
            username: this.props.userprof.username,
            age: this.props.userprof.age,
            biography: this.props.userprof.biography,
            followers: this.props.userprof.followers,
            following: this.props.userprof.following,
            playlists: this.props.userprof.playlists,
            playView: false,
            showSongs: false
        };
    }

    togglePlaylistView() {
        this.setState({ playView: !this.state.playView });
    }

    toggleShowSongs() {
        this.setState({ showSongs: !this.state.showSongs });
    }

    render() {
        const songsList = [];
        return (
            <div className="prof-preview-div">
                <div className="h-inline-div">
                    <h1 className="color-white">Profile of: {this.state.username}{` (${this.state.age} years old)`}</h1>
                    <button onClick={this.togglePlaylistView} className="add-btn">Toggle to Playlists/songs or Profile</button>
                </div>
                {
                    !this.state.playView ?
                        <>
                            
                            <div className="biography"><h2>Biography:</h2>
                                {this.state.biography}
                            </div>
                            <Follow followers={this.state.followers} following={this.state.following}></Follow>
                        </>
                        :
                        <>
                            <h1 className="playlists-h1">Playlists:</h1>
                            <button className="add-btn" onClick={this.toggleShowSongs}>Toggle Songs/Playlist</button>
                            {!this.state.showSongs ?
                                <>
                                    <div className="playlists-list">
                                        {this.state.playlists.map((playlist, key) => (
                                            <Playlist
                                                key={key}
                                                name={playlist.name}
                                                songs={playlist.songs}
                                                lastEdit={playlist.lastEdit}
                                                comments={playlist.comments}
                                            />
                                        ))}
                                    </div>
                                </>
                                :
                                <>
                                    <div className="playlists-list">
                                        {this.state.playlists.map((playlist) => (
                                            playlist.songs.map((song, key) => {
                                                if (!songsList.find(s => s.name === song.name && s.artist === song.artist)) {
                                                    songsList.push(song);
                                                    return <Song key={key} name={song.name} artist={song.artist} link={song.link} dateAdded={song.dateAdded}></Song>
                                                }
                                            })
                                        ))}
                                    </div>
                                </>
                            }
                        </>
                }

            </div>
        );
    }
}