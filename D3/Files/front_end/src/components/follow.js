// Pieter Venter u23896257
import React from "react";
import { Link } from "react-router-dom";

export class Follow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            followers: [],
            following: [],
            loading: true,
            error: null,
        };
    }

    async componentDidMount() {
        try {
            const userId = this.props.userId; 

            // Fetch following data
            const followingResponse = await fetch('http://localhost:3005/getFollowing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ followingIds: this.props.followingIds }), // Pass the IDs to fetch
            });

            if (!followingResponse.ok) {
                throw new Error('Failed to fetch following data');
            }

            const followingData = await followingResponse.json();
            this.setState({ following: followingData });

            // Fetch followers data
            const followersResponse = await fetch(`http://localhost:3005/getFollowers/${userId}`);
            if (!followersResponse.ok) {
                throw new Error('Failed to fetch followers data');
            }

            const followersData = await followersResponse.json();
            this.setState({ followers: followersData });
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ error: error.message });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { followers, following, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>; // Show a loading message
        }

        if (error) {
            return <div>Error: {error}</div>; // Show any error message
        }

        return (
            <div className="home-group-duo div-background">
                <div className="home-div div-auto">
                    <h2 className="home-h2 default-color">Users they follow:</h2>
                    <div className="recent-songs-div">
                        {following.map((follow) => (
                            <div key={follow.id} className="inline-border-div">
                                <Link to={`/profilePre/${follow.username}`}>You are following <em>{follow.username}</em></Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="home-div div-auto">
                    <h2 className="home-h2 default-color">Their followers:</h2>
                    <div className="playlists-div">
                        {followers.map((follow) => (
                            <div key={follow.id} className="inline-border-div">
                                <Link to={`/profilePre/${follow.username}`}>{follow.username} <em>is following you!</em></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
