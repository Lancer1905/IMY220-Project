// Pieter Venter u23896257
import React,{useState, useEffect} from "react";
import { NavBar } from "../components/navbar";
import { Song } from "../components/song";
import { Playlist } from "../components/playlist";
import { Link,useParams } from "react-router-dom";
import { AddSong } from "../components/addSong";
import SearchBar from "../components/searchBar";

const Home = () => {
    const [songAdd, setSongAdd] = useState(false);
    const [recentSongs, setSongs] = useState([]);
    const [recentPlaylists, setPlaylists] = useState([]);
    const [sTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const { username } = useParams(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3005/getPlaylists/${username}`);
                if (!response.ok) {
                    throw new Error("Playlists not found");
                }
                const data = await response.json();
                setPlaylists(data);

                const res = await fetch(`http://localhost:3005/getPlaylists/songs/${username}`);
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
    }, [username]);

    const displayUsername = username || "No username";

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

    const filteredSongs = sortedSongs.filter(song =>
        song.name.toLowerCase().includes(sTerm.toLowerCase())
    );

    const filteredPlaylists = sortedPlaylists.filter(play => 
        play.name.toLowerCase().includes(sTerm.toLowerCase())
    );

    const searchTerm = (term) => {
        setSearchTerm(term);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar loggedIn={true} username={username} />
            <h1 className="home-h1">Welcome back: {displayUsername}</h1>
            <div className="home-group">
                <SearchBar onSearch={searchTerm} />
                <div className="home-group-duo">
                    <div className="home-div">
                        <h2 className="home-h2">Recently added songs:</h2>
                        <div className="recent-songs-div">
                            {(sTerm === "" ? sortedSongs : filteredSongs).slice(0,5).map((song, key) => (
                                <Song key={key} id={song.id} name={song.name} artist={song.artist} dateAdded={song.dateAdded} />
                            ))}
                        </div>
                    </div>
                    <div className="home-div">
                        <h2 className="home-h2">Recently edited playlists:</h2>
                        <div className="playlists-div">
                            {(sTerm === "" ? sortedPlaylists : filteredPlaylists).slice(0,5).map((list,key) => (
                                <Playlist username={username} key={key} id={list.id} name={list.name} lastEdit={list.lastEdit} comments={list.comments} />
                            ))}
                        </div>
                        <Link to={`/playlists/${username}`}>
                            <button className="login-btn">Show all</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;