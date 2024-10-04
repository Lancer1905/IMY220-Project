import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Playlist } from "../components/playlist";
import { NavBar } from "../components/navbar";
import { AddSong } from "../components/addSong";

const PlaylistPage = () => {
    const { name } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Loading state
    const [addSong, setAddSong] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');

    useEffect(() => {
        const fetchPlaylist = async () => {
            setLoading(true);
            try {

                const encodedName = encodeURIComponent(name);

                const response = await fetch(`http://localhost:3005/getPlaylist/${encodedName}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch playlist");
                }
                const data = await response.json();
                setPlaylist(data[0]);

                if (data && data[0].id) {
                    const songsRes = await fetch(`http://localhost:3005/getSongs/${data[0].id}`);
                    if (!songsRes.ok) {
                        throw new Error("Failed to fetch songs");
                    }
                    const songData = await songsRes.json();
                    setSongs(songData);
                } else {
                    console.error("Playlist ID is undefined:", data);
                }

            } catch (error) {
                console.error("Error fetching playlist:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchPlaylist();
    }, [name]);

    const toggleAddSong = () => {
        setAddSong(prev => !prev);
    };

    const handleSongAdd = async(name, artist, link, playId) => {
        
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

        if (response.ok) {        
            setSongs(prevSongs => [...prevSongs, msg.song]);
            setAddSong(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!playlist) {
        return <div>Playlist not found.</div>; 
    }

    return (
        <>
            <NavBar loggedIn={true} username={username}/>
            <h1 className="playlist-h1">Playlist: {playlist.name}</h1>

            {!addSong ? (
                <div className="playlist-page">
                    <Playlist
                        id={playlist.id}
                        showSongs={true}
                        name={playlist.name}
                        lastEdit={playlist.lastEdit}
                        songs={songs} 
                        comments={playlist.comments}
                    />
                </div>
            ) : (
                <div className="playlist-page">
                    <AddSong onSongAdd={handleSongAdd} />
                    <button className="add-btn" onClick={toggleAddSong}>Cancel</button>
                </div>
            )}
        </>
    );
};

export default PlaylistPage;
