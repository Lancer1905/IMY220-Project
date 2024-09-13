// Pieter Venter u23896257
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Song } from "./song";
import { Comment } from "./comment";
import { AddComment } from "./addComment";
import { AddSong } from "./addSong";

const username = "Pieter";

export class Playlist extends React.Component {

    

    constructor(props) {
        super(props);

        this.togglePreview = this.togglePreview.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.handleCommentAdd = this.handleCommentAdd.bind(this);
        this.toggleAddComment = this.toggleAddComment.bind(this);
        this.toggleAddSong = this.toggleAddSong.bind(this);
        this.handleSongAdd = this.handleSongAdd.bind(this);

        this.state = {
            name : this.props.name,
            songs: this.props.songs,
            lastEdit: this.props.lastEdit,
            comments: this.props.comments,
            preview: false,
            showSongs: this.props.showSongs ? true : false,
            showComments : false,
            addComment: false,
            addSong: false
        };
        /*  
            playlist.name = "some name",
            playlist.songs = [{name:"",artist:""}]
        */
    }

    togglePreview() {
        this.setState({ preview: !this.state.preview });
    }

    toggleComments() {
        this.setState({ showComments: !this.state.showComments });
    }

    toggleAddComment() {
        this.setState({addComment: !this.state.addComment});
    }

    toggleAddSong() {
        this.setState({addSong : !this.state.addSong});
    }

    handleCommentAdd(username,comment) {
        this.state.comments.push({username: username, contents: comment});
        this.setState({ addComment: !this.state.addComment });
    }

    handleSongAdd(name, artist, link, dateAdded) {
        // logic to add song to this playlist

        this.setState({addSong:false});
    }

    render(){ //sal somehow die data van die plalist comp kan stuur na n page toe om die data te display
        return (
            this.state.showSongs ?
            <>
                <div className="playlists-h-div">
                    <h1 className="playlists-h1">{this.state.name}</h1>
                    <h2 className="playlists-h1">contains {this.state.songs.length} songs</h2>
                    <button onClick={this.toggleComments}>Toggle Comments</button>
                </div>
                {!this.state.showComments ?
                 !this.state.addSong ?
                    <div className="songs-list ">
                        {this.state.songs.map((song,key) => {
                            return <Song key={key} name={song.name} artist={song.artist} dateAdded={song.dateAdded} link={song.link}></Song>
                        })}
                        <button className="add-btn" onClick={this.toggleAddSong}>Add song</button>
                    </div>
                    :
                    <div className="playlist-page">
                        <AddSong onSongAdd={this.handleSongAdd}></AddSong>
                        <button className="add-btn" onClick={this.toggleAddSong}>Cancel</button>
                    </div>
                :
                !this.state.addComment ?
                <>
                    <div className="songs-list">
                        {this.state.comments.map((comment,key) => {
                            return <Comment key={key} username={comment.username} contents={comment.contents}></Comment>
                        })}
                    </div>
                    <button className="login-btn" onClick={this.toggleAddComment}>Add comment</button>
                </>
                :
                <>
                    <AddComment username={username} onAddComment={this.handleCommentAdd}></AddComment>
                    <button className="login-btn" onClick={this.toggleAddComment}>Cancel comment</button>
                </>
                } 
            </> 
            :
            !this.state.preview ? 
            <div className="inline-border-div">
                <u>{`${this.state.name}`}</u><em> contains {`${this.state.songs.length}`} songs</em>
                <Link className="search-btn" to={`/playlist/${this.state.name}`}>Go to</Link>
                <button onClick={this.togglePreview}>Preview</button>
            </div>
            :
            <>
                <div className="inline-border-div">
                    <u>{`${this.state.name}`}</u><em> contains {`${this.state.songs.length}`} songs</em>
                    <Link className="search-btn" to={`/playlist/${this.state.name}`}>Go to</Link>
                    <button onClick={this.togglePreview}>Preview</button>
                </div>
                <div className="playlist-preview">
                    {this.state.songs.map((song,key) => {
                        if (key < 5){
                            return <Song key={key} name={song.name} artist={song.artist} dateAdded={song.dateAdded} link={song.link}></Song>
                        } else return null;
                    })}
                </div>
            </>
        );
    }
}
