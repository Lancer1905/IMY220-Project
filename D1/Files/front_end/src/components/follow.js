// Pieter Venter u23896257
import React from "react";

export class Follow extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            followers: this.props.followers,
            following: this.props.following,
        };
    }

    render() {
        return (
            <div className="home-group-duo div-background">
                <div className="home-div div-auto">
                    <h2 className="home-h2 default-color">Playlists they follow:</h2>
                    <div className="recent-songs-div">
                        {this.state.following.map((follow, key) => (
                            follow.playlists.map(play => (
                                <div className="inline-border-div">{play.name} <em>from {follow.username}</em></div>
                            ))
                        ))}
                    </div>
                </div>
                <div className="home-div div-auto">
                    <h2 className="home-h2 default-color">Their followers:</h2>
                    <div className="playlists-div">
                        {this.state.followers.map((follow, key) => (
                            <div className="inline-border-div">{follow.username} <em>is following you!</em></div>
                        ))}
                    </div>
                </div>
            </div> 
        );
    }
}