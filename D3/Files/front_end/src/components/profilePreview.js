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
            userId: this.props.userprof.id,
            username: this.props.userprof.username,
            age: this.props.userprof.age,
            biography: this.props.userprof.biography,
            followers: this.props.userprof.followers || [], //numbers array
            following: this.props.userprof.following || [],
            playlists: this.props.userprof.playlists,
            playView: false,
            showSongs: false,
            songsData: {}, // Store fetched songs here
            loadingSongs: true,
            loadingPlaylists: true,
        };
    }

    componentDidMount() {
        this.fetchSongs();
        this.fetchPlaylists();
    }

    async fetchPlaylists() {
        try {
            const response = await fetch(`http://localhost:3005/getPlaylists/${this.state.username}`); // Fetch songs for each playlist
            if (!response.ok) {
                throw new Error(`Failed to fetch playlists}`);
            }
            const playlistsData = await response.json();
            this.setState({ playlists: playlistsData, loadingPlaylists: false });

        } catch (error) {
            console.error(error);
        }
    }

    async fetchSongs() {
        try {
            const response = await fetch(`http://localhost:3005/getPlaylists/songs/${this.state.username}`); // Fetch songs for each playlist
            if (!response.ok) {
                throw new Error(`Failed to fetch songs}`);
            }
            const songData = await response.json();
            this.setState({ songsData: songData, loadingSongs: false });

        } catch (error) {
            console.error(error); 
        }
    }

    togglePlaylistView() {
        this.setState({ playView: !this.state.playView });
    }

    toggleShowSongs() {
        this.setState({ showSongs: !this.state.showSongs });
    }

    render() {
        return (
            <div className="prof-preview-div">
                <div className="h-inline-div">
                    <h1 className="color-white">Profile of: {this.state.username} ({this.state.age} years old)</h1>
                    <button onClick={this.togglePlaylistView} className="add-btn">Toggle to Playlists/Songs or Profile</button>
                </div>
                {
                    !this.state.playView ?
                        <>
                            <div className="biography">
                                <h2>Biography:</h2>
                                {this.state.biography}
                            </div>
                            <Follow userId={this.state.userId} followingIds={this.state.following}></Follow>
                        </>
                        :
                        <>
                            <h1 className="playlists-h1">Playlists:</h1>
                            <button className="add-btn" onClick={this.toggleShowSongs}>Toggle Songs/Playlist</button>
                            {!this.state.showSongs ? (
                                <div className="playlists-list">
                                    {this.state.playlists.map((playlist) => (
                                        <Playlist
                                            username={this.state.username}
                                            id={playlist.id}
                                            name={playlist.name}
                                            lastEdit={playlist.lastEdit}
                                            comments={playlist.comments}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="playlists-list">
                                    {Object.values(this.state.songsData).flat().map((song) => ( // Flatten the songs for rendering
                                        <Song
                                            id={song.id}
                                            name={song.name}
                                            artist={song.artist}
                                            link={song.link}
                                            dateAdded={song.dateAdded}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                }
            </div>
        );
    }
}
