// Pieter Venter u23896257
import React,{useState} from "react";
import { NavBar } from "../components/navbar";
import { Song } from "../components/song";
import { Playlist } from "../components/playlist";
import { Link,useParams } from "react-router-dom";
import { AddSong } from "../components/addSong";
import SearchBar from "../components/searchBar";

const recentSongs = [
    {
        name: "Monstrosity",
        artist: "Robert Slump",
        dateAdded: "2024-09-19",
        link: "https://www.youtube.com/results?search_query=Monstrosity+Robert+Slump"
    },
    {
        name: "Who I am",
        artist: "Alan Walker",
        dateAdded: "2024-01-19",
        link: "https://www.youtube.com/results?search_query=Who+I+am+Alan+Walker"
    },
    {
        name: "Monstrosity",
        artist: "Robert Slump",
        dateAdded: "2024-10-19",
        link: "https://www.youtube.com/results?search_query=Monstrosity+Robert+Slump"
    },
    {
        name: "Who I am(Rock Remix)",
        artist: "Alan Walker",
        dateAdded: "2024-09-09",
        link: "https://www.youtube.com/results?search_query=Who+I+am+Rock+Remix+Alan+Walker"
    },
    {
        name: "Monstrosity",
        artist: "Robert Slump",
        dateAdded: "2024-09-29",
        link: "https://www.youtube.com/results?search_query=Monstrosity+Robert+Slump"
    },
    {
        name: "Who I am(Rock Remix)",
        artist: "Alan Walker",
        dateAdded: "2024-09-19",
        link: "https://www.youtube.com/results?search_query=Who+I+am+Rock+Remix+Alan+Walker"
    }
];

const editedPlaylists = [
    {
        name: "Indie Hits",
        songs: [
            {
                name: "Electric Feel",
                artist: "MGMT",
                dateAdded: "2024-03-15",
                link: "https://www.youtube.com/results?search_query=Electric+Feel+MGMT"
            },
            {
                name: "Young Folks",
                artist: "Peter Bjorn and John",
                dateAdded: "2024-06-22",
                link: "https://www.youtube.com/results?search_query=Young+Folks+Peter+Bjorn+and+John"
            },
            {
                name: "Skinny Love",
                artist: "Bon Iver",
                dateAdded: "2024-01-10",
                link: "https://www.youtube.com/results?search_query=Skinny+Love+Bon+Iver"
            }
        ],
        lastEdit: "2024-09-19",
        comments: [
            {
                username: "user1",
                contents: "A collection of popular indie tracks"
            },
            {
                username: "user2",
                contents: "Great for a chill, laid-back vibe"
            }
        ]
    },
    {
        name: "Pop Favorites",
        songs: [
            {
                name: "Blinding Lights",
                artist: "The Weeknd",
                dateAdded: "2024-02-25",
                link: "https://www.youtube.com/results?search_query=Blinding+Lights+The+Weeknd"
            },
            {
                name: "Watermelon Sugar",
                artist: "Harry Styles",
                dateAdded: "2024-07-08",
                link: "https://www.youtube.com/results?search_query=Watermelon+Sugar+Harry+Styles"
            }
        ],
        lastEdit: "2024-09-20",
        comments: [
            {
                username: "user3",
                contents: "Top pop hits for dancing and sing-alongs"
            },
            {
                username: "user4",
                contents: "Includes current chart-toppers"
            }
        ]
    },
    {
        name: "Jazz Standards",
        songs: [
            {
                name: "Take Five",
                artist: "Dave Brubeck",
                dateAdded: "2024-04-01",
                link: "https://www.youtube.com/results?search_query=Take+Five+Dave+Brubeck"
            },
            {
                name: "My Favorite Things",
                artist: "John Coltrane",
                dateAdded: "2024-05-12",
                link: "https://www.youtube.com/results?search_query=My+Favorite+Things+John+Coltrane"
            },
            {
                name: "So What",
                artist: "Miles Davis",
                dateAdded: "2024-08-09",
                link: "https://www.youtube.com/results?search_query=So+What+Miles+Davis"
            },
            {
                name: "Feeling Good",
                artist: "Nina Simone",
                dateAdded: "2024-06-30",
                link: "https://www.youtube.com/results?search_query=Feeling+Good+Nina+Simone"
            }
        ],
        lastEdit: "2024-09-30",
        comments: [
            {
                username: "user5",
                contents: "Classic jazz tracks for a sophisticated listening experience"
            },
            {
                username: "user6",
                contents: "Features some of the most influential jazz artists"
            }
        ]
    },
    {
        name: "Electronic Vibes",
        songs: [
            {
                name: "Midnight City",
                artist: "M83",
                dateAdded: "2024-03-20",
                link: "https://www.youtube.com/results?search_query=Midnight+City+M83"
            },
            {
                name: "Strobe",
                artist: "Deadmau5",
                dateAdded: "2024-02-10",
                link: "https://www.youtube.com/results?search_query=Strobe+Deadmau5"
            },
            {
                name: "Titanium",
                artist: "David Guetta feat. Sia",
                dateAdded: "2024-07-18",
                link: "https://www.youtube.com/results?search_query=Titanium+David+Guetta+feat+Sia"
            },
            {
                name: "Wake Me Up",
                artist: "Avicii",
                dateAdded: "2024-05-25",
                link: "https://www.youtube.com/results?search_query=Wake+Me+Up+Avicii"
            },
            {
                name: "Lean On",
                artist: "Major Lazer & DJ Snake",
                dateAdded: "2024-08-02",
                link: "https://www.youtube.com/results?search_query=Lean+On+Major+Lazer+DJ+Snake"
            }
        ],
        lastEdit: "2024-08-19",
        comments: [
            {
                username: "user7",
                contents: "Energetic electronic tracks to keep you moving"
            },
            {
                username: "user8",
                contents: "Perfect for parties or workouts"
            }
        ]
    },
    {
        name: "Rock Classics",
        songs: [
            {
                name: "Stairway to Heaven",
                artist: "Led Zeppelin",
                dateAdded: "2024-01-15",
                link: "https://www.youtube.com/results?search_query=Stairway+to+Heaven+Led+Zeppelin"
            },
            {
                name: "Smoke on the Water",
                artist: "Deep Purple",
                dateAdded: "2024-04-10",
                link: "https://www.youtube.com/results?search_query=Smoke+on+the+Water+Deep+Purple"
            },
            {
                name: "Hotel California",
                artist: "Eagles",
                dateAdded: "2024-03-05",
                link: "https://www.youtube.com/results?search_query=Hotel+California+Eagles"
            }
        ],
        lastEdit: "2024-09-19",
        comments: [
            {
                username: "user9",
                contents: "Iconic rock songs from the classic era"
            },
            {
                username: "user10",
                contents: "Includes timeless anthems and fan favorites"
            }
        ]
    },
    {
        name: "Relaxing Piano",
        songs: [
            {
                name: "River Flows in You",
                artist: "Yiruma",
                dateAdded: "2024-02-15",
                link: "https://www.youtube.com/results?search_query=River+Flows+in+You+Yiruma"
            },
            {
                name: "Comptine d'un autre été: L'après-midi",
                artist: "Yann Tiersen",
                dateAdded: "2024-07-25",
                link: "https://www.youtube.com/results?search_query=Comptine+d%27un+autre+été+L%27après-midi+Yann+Tiersen"
            }
        ],
        lastEdit: "2024-09-11",
        comments: [
            {
                username: "user11",
                contents: "Soothing piano pieces for relaxation and focus"
            },
            {
                username: "user12",
                contents: "Ideal for studying or unwinding after a long day"
            }
        ]
    },
    {
        name: "Hip Hop Gold",
        songs: [
            {
                name: "Sicko Mode",
                artist: "Travis Scott",
                dateAdded: "2024-05-30",
                link: "https://www.youtube.com/results?search_query=Sicko+Mode+Travis+Scott"
            },
            {
                name: "HUMBLE.",
                artist: "Kendrick Lamar",
                dateAdded: "2024-03-18",
                link: "https://www.youtube.com/results?search_query=HUMBLE+Kendrick+Lamar"
            },
            {
                name: "God's Plan",
                artist: "Drake",
                dateAdded: "2024-06-05",
                link: "https://www.youtube.com/results?search_query=God%27s+Plan+Drake"
            },
            {
                name: "Bad and Boujee",
                artist: "Migos feat. Lil Uzi Vert",
                dateAdded: "2024-04-20",
                link: "https://www.youtube.com/results?search_query=Bad+and+Boujee+Migos+feat+Lil+Uzi+Vert"
            }
        ],
        lastEdit: "2024-09-01",
        comments: [
            {
                username: "user13",
                contents: "Top hip hop tracks that are sure to get you hyped"
            },
            {
                username: "user14",
                contents: "Features some of the genre's biggest hits"
            }
        ]
    }
];


const Home = () => {
    const [songAdd, setSongAdd] = useState(false);
    const [sTerm, setSearchTerm] = useState("");

    const { username } = useParams(); 

    const displayUsername = username || "No username";

    const sortedSongs = [...recentSongs].sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateB - dateA;
    });

    const sortedPlaylists = [...editedPlaylists].sort((a, b) => {
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

    const addSong = () => {
        setSongAdd(songAdd => !songAdd);
    }

    const handleSongAdd = (name,artist,link,playName) => {
        //logic to handle adding song

        setSongAdd(songAdd => !songAdd);
    }
    const searchTerm = (term) => {
        setSearchTerm(term);
    };

    return (
        <>
            <NavBar loggedIn={true} username={username} />
            <h1 className="home-h1">Welcome back: {displayUsername}</h1>
            <div className="home-group">
                <SearchBar onSearch={setSearchTerm} />
                <div className="home-group-duo">
                    <div className="home-div">
                        <h2 className="home-h2">Recently added songs:</h2>
                        <div className="recent-songs-div">
                            {(sTerm === "" ? sortedSongs : filteredSongs).slice(0, 5).map((song, key) => (
                                <Song key={key} name={song.name} artist={song.artist} dateAdded={song.dateAdded} />
                            ))}
                        </div>
                        <button className="login-btn" onClick={addSong}>Add a song</button>
                    </div>
                    {songAdd ? (
                        <AddSong onSongAdd={handleSongAdd} />
                    ) : (
                        <div className="home-div">
                            <h2 className="home-h2">Recently edited playlists:</h2>
                            <div className="playlists-div">
                                {(sTerm === "" ? sortedPlaylists : filteredPlaylists).slice(0, 5).map((list, key) => (
                                    <Playlist key={key} name={list.name} songs={list.songs} lastEdit={list.lastEdit} comments={list.comments} />
                                ))}
                            </div>
                            <Link to={`/playlists/${username}`}>
                                <button className="login-btn">Show all</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;