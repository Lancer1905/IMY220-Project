// Pieter Venter u23896257
import React from "react";

export class AddComment extends React.Component {

    constructor(props){
        super(props);

        this.commentRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const comment = this.commentRef.current.value;

        this.props.onAddComment(comment);
    }

    render(){
        return (
            <>
                <form className="add-song-div" onSubmit={this.handleSubmit}>
                    <div className="profile-data-div">
                        <label className="profile-label">Comment: </label>
                        <textarea className="profile-input" ref={this.commentRef} type="text" placeholder="Enter your comment here"></textarea>
                    </div>    

                    <button className="add-btn" type="submit">Add comment</button>
                </form>
            </>
        );
    }
}