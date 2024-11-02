// Pieter Venter u23896257
import React, { useState, useEffect } from "react";
import { Playlist } from "../components/playlist";
import { NavBar } from "../components/navbar";
import { useParams } from "react-router-dom";
import { Song } from "../components/song";
import { AddSong } from "../components/addSong";
import { AddPlaylist } from "../components/addPlaylist";
import SearchBar from "../components/searchBar";

const Playlists = () => {
    const { username } = useParams();
    const [playlists, setPlaylists] = useState([]); 
    const [showSongs, setShowSongs] = useState(false);
    const [allSongs,setSongs] = useState([]);
    const [addSong, setAddSong] = useState(false);
    const [createPlay, setCreatePlay] = useState(false);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch(`http://localhost:3005/getPlaylists/${username}`); 
                if (!response.ok) {
                    throw new Error("Failed to fetch playlists");
                }
                const data = await response.json();
                setPlaylists(data); 

                const res = await fetch(`http://localhost:3005/getPlaylists/songs/${username}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch Songs");
                }
                const songsData = await res.json();
                setSongs(songsData); 

            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        fetchPlaylists();
    }, [username]); 

    const toggleShowSongs = () => {
        setShowSongs(prev => !prev);
    };

    const toggleAddSong = () => {
        setAddSong(prev => !prev);
    };

    const handleSongAdd = async(name, artist, link, playId) => {

        try {
            const response = await fetch(`http://localhost:3005/addSong/${playId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    artist: artist,
                    link: link,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create Song');
            }

            const data = await response.json();
            setSongs(prevAllSongs => [...prevAllSongs, data.song]);

        } catch (error) {
            console.error('Error adding song:', error);
            return null;
        }

        setAddSong(prev => !prev);
    };

    const toggleCreatePlayL = () => {
        setCreatePlay(prev => !prev);
    };

    const handlePlayCreate = async (name) => {

        try {
            const response = await fetch(`http://localhost:3005/addPlaylist/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create playlist');
            }

            const data = await response.json();
            setPlaylists(prevPlaylists => [...prevPlaylists, data.playlist]);
        } catch (error) {
            console.error('Error creating playlist:', error);
            return null; 
        }

        setCreatePlay(prev => !prev);
    };

    return (
        <>
            <NavBar loggedIn={true} username={username}/>
            <div className="playlists-list-div">
                <h1 className="playlists-h1">Playlists:</h1>
                <SearchBar />
                <button className="add-btn" onClick={toggleShowSongs}>Toggle Songs/Playlist</button>
                {!showSongs ? (
                    !createPlay ? (
                        <>
                            <div className="playlists-list">
                                {playlists.map((playlist, key) => (
                                    <Playlist
                                        key={key}
                                        id={playlist.id}
                                        name={playlist.name}
                                        lastEdit={playlist.lastEdit}
                                        comments={playlist.comments}
                                    />
                                ))}
                            </div>
                            <button className="add-btn" onClick={toggleCreatePlayL}>Create playlist</button>
                        </>
                    ) : (
                        <div className="centered-div">
                            <AddPlaylist onCreatePlay={handlePlayCreate} />
                            <button className="add-btn" onClick={toggleCreatePlayL}>Cancel</button>
                        </div>
                    )
                ) : !addSong ? (
                    <>
                        <div className="playlists-list">
                            {allSongs.map((song,key) => {
                                return <Song key={key} id={song.id} name={song.name} artist={song.artist} link={song.link} dateAdded={song.dateAdded} />;
                            })}
                        </div>
                        <button className="add-btn" onClick={toggleAddSong}>Add song</button>
                    </>
                ) : (
                    <div className="centered-div">
                        <AddSong playlists={playlists} onSongAdd={handleSongAdd} />
                        <button onClick={toggleAddSong} className="add-btn">Cancel</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Playlists;
