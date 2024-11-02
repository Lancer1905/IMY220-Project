// Pieter Venter u23896257
import React from "react";

export class Comment extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username: this.props.username,
            contents: this.props.contents
        };
    }

    render() {
        return (
            <div className="comment-div">
                <p>{`${this.state.contents} - by ${this.state.username}`}</p>
            </div>
        );
    }
}