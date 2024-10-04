// Pieter Venter u23896257
import React from "react";

export class Song extends React.Component {

    constructor(props){
        super(props);

        this.linkRef = React.createRef();
        this.handleDivClick = this. handleDivClick.bind(this);

        this.state = {
            name: this.props.name,
            artist: this.props.artist,
            link: this.props.link,
            dateAdded: this.props.dateAdded
        };
    }

    handleDivClick () {
        if (this.linkRef.current) {
            this.linkRef.current.click(); 
        }
    };

    render(){
        return (
            <div className="inline-border-div" onClick={this.handleDivClick}>
                <u>{`${this.state.name}`}</u><em> by {`${this.state.artist}`}</em>

                <a ref={this.linkRef} className="no-decor" href={this.state.link} target="_blank" rel="noopener noreferrer"></a> 
            </div>
        );
    }
}