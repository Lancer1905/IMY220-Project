// Pieter Venter u23896257
import React, {useState, useEffect} from "react";
import { NavBar } from "../components/navbar";
import { Song } from "../components/song";
import { Playlist } from "../components/playlist";
import { useParams } from "react-router-dom";

const Community = () => {
    const [recentSongs, setSongs] = useState([]);
    const [recentPlaylists, setPlaylists] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3005/getPlaylists/latest`);
                if (!response.ok) {
                    throw new Error("Playlists not found");
                }
                const data = await response.json();
                setPlaylists(data);

                const res = await fetch(`http://localhost:3005/getSongs/latest`);
                if (!res.ok) {
                    throw new Error("Songs not found");
                }
                const songsData = await res.json();
                setSongs(songsData);
                console.log(songsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[]);
    
    const sortedSongs = [...recentSongs].sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateB - dateA;
    });

    const sortedPlaylists = [...recentPlaylists].sort((a, b) => {
        const dateA = new Date(a.lastEdit);
        const dateB = new Date(b.lastEdit);
        return dateB - dateA;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />
            <h1 className="home-h1">Community feed</h1>
            <div className="home-group flex-d-row">
                <div className="home-div">
                    <h2 className="home-h2">Recently added songs:</h2>
                    <div className="recent-songs-div">
                        {sortedSongs.slice(0,5).map((song, key) => (
                            <Song key={key} id={song.id} name={song.name} artist={song.artist} link={song.link} dateAdded={song.dateAdded} />
                        ))}
                    </div>
                    <button>See more</button>
                </div>
                <div className="home-div">
                    <h2 className="home-h2">Recently edited playlists:</h2>
                    <div className="playlists-div">
                        {sortedPlaylists.slice(0,5).map((list, key) => (
                            <Playlist key={key} id={list.id} name={list.name} lastEdit={list.lastEdit} comments={list.comments} />
                        ))}
                    </div>
                    <button>See more</button>
                </div>
            </div>
        </>
    );
};

export default Community;