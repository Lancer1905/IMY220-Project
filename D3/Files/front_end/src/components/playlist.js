import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Song } from "./song";
import { Comment } from "./comment";
import { AddComment } from "./addComment";
import { AddSong } from "./addSong";

export class Playlist extends React.Component {
    constructor(props) {
        super(props);

        this.togglePreview = this.togglePreview.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.handleCommentAdd = this.handleCommentAdd.bind(this);
        this.toggleAddComment = this.toggleAddComment.bind(this);
        this.toggleAddSong = this.toggleAddSong.bind(this);
        this.handleSongAdd = this.handleSongAdd.bind(this);
        this.fetchSongsData = this.fetchSongsData.bind(this);

        this.state = {
            id: this.props.id,
            name: this.props.name || "",
            songs: [], 
            lastEdit: this.props.lastEdit || "",
            comments: this.props.comments || [], 
            owner: this.props.owner||"",
            preview: false,
            showSongs: this.props.showSongs ? true : false,
            showComments: false,
            addComment: false,
            addSong: false,
            loadingSongs: true,
            username: this.props.username,
           
        };
    }

    componentDidMount() {
        this.fetchSongsData();
    }

    async fetchSongsData() {
        try {
            const response = await fetch(`http://localhost:3005/getSongs/${this.state.id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch songs`);
            }
            const songsData = await response.json();
            
            if (JSON.stringify(songsData) !== JSON.stringify(this.state.songs)) {
                this.setState({ songs: songsData, loadingSongs: false });
            } else {
                this.setState({ loadingSongs: false }); 
            }

        } catch (error) {
            console.error(error);
            this.setState({ loadingSongs: false });
        } 
    }

    togglePreview() {
        this.setState({ preview: !this.state.preview });
    }

    toggleComments() {
        this.setState({ showComments: !this.state.showComments });
    }

    toggleAddComment() {
        this.setState({ addComment: !this.state.addComment });
    }

    toggleAddSong() {
        this.setState({ addSong: !this.state.addSong });
    }

    async handleCommentAdd(comment) {

        const response = await fetch(`http://localhost:3005/addComment/${this.state.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.props.username,
                contents: comment,
            }),
        });

        const msg = await response.json();
        alert(msg.msg);

        const tempUsername = this.state.username;

        if (response.ok) {
            this.setState((prevState) => ({
                comments: [...prevState.comments, { tempUsername, contents: comment }],
                addComment: false
            }));
        }
    }

    async handleSongAdd(name, artist, link, playId) {

        const response = await fetch(`http://localhost:3005/addSong/${playId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                name: name,
                artist: artist,
                link: link,
             }),
        });

        const msg = await response.json();
        alert(msg.msg);

        if (response.ok){
            this.setState((prevState) => ({
                songs: [...prevState.songs, msg.song],
                addSong: false
            }));
        }
    }

    render() {

        if (this.state.loadingSongs) {
            return <div>Loading...</div>;
        }

        return this.state.showSongs ? (
            <>
                <div className="playlists-h-div">
                    <h1 className="playlists-h1">{this.state.name} and username: {this.state.username}</h1>
                    <h2 className="playlists-h1">contains {this.state.songs.length} songs</h2>
                    <button><Link to={`/profilePre/${this.props.owner}`}>Go to Owner</Link></button>
                    <button onClick={this.toggleComments}>Toggle Comments</button>
                </div>
                {!this.state.showComments ? (
                    !this.state.addSong ? (
                        <div className="songs-list">
                            {this.state.songs.map((song) => (
                                <Song id={song.id} name={song.name} artist={song.artist} dateAdded={song.dateAdded} link={song.link} />
                            ))}
                            <button className="add-btn" onClick={this.toggleAddSong}>Add song</button>
                        </div>
                    ) : (
                        <div className="playlist-page">
                            <AddSong playlists={[{id:this.state.id,name:this.state.name}]} onSongAdd={this.handleSongAdd} />
                            <button className="add-btn" onClick={this.toggleAddSong}>Cancel</button>
                        </div>
                    )
                ) : !this.state.addComment ? (
                    <>
                        <div className="songs-list">
                            {this.state.comments.map((comment, key) => (
                                <Comment key={key} username={comment.username} contents={comment.contents} />
                            ))}
                        </div>
                        <button className="login-btn" onClick={this.toggleAddComment}>Add comment</button>
                    </>
                ) : (
                    <>
                        <AddComment onAddComment={this.handleCommentAdd} />
                        <button className="login-btn" onClick={this.toggleAddComment}>Cancel comment</button>
                    </>
                )}
            </>
        ) : !this.state.preview ? (
            <div className="inline-border-div">
                <u>{this.state.name}</u><em> contains {this.state.songs.length} songs</em>
                <Link className="search-btn" to={`/playlist/${this.state.name}?username=${this.props.username}`}>Go to</Link>
                <button onClick={this.togglePreview}>Preview</button>
            </div>
        ) : (
            <>
                <div className="inline-border-div">
                    <u>{this.state.name}</u><em> contains {this.state.songs.length} songs</em>
                    <Link className="search-btn" to={`/playlist/${this.state.name}?username=${this.props.username}`}>Go to</Link>
                    <button onClick={this.togglePreview}>Preview</button>
                </div>
                <div className="playlist-preview">
                    {this.state.songs.map((song,key) => {
                        if (key < 5) {
                            return <Song id={song.id} name={song.name} artist={song.artist} dateAdded={song.dateAdded} link={song.link} />;
                        }
                        return null;
                    })}
                </div>
            </>
        );
    }
}
