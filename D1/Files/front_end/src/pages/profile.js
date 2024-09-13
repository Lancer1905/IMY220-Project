// Pieter Venter u23896257
import React, { useState, useRef } from "react";
import { NavBar } from "../components/navbar";
import { useParams } from "react-router-dom";
import { ProfilePreview } from "../components/profilePreview";

const Profile = ( loggedIn ) => {

    const [errors, setErrors] = useState(null);
    const [preview, setPreview] = useState(false);
    const [loginStatus, setLoginS] = useState(loggedIn ? loggedIn : false);

    const { username } = useParams();
    const nameRef = useRef(null);
    const passRef = useRef(null);
    const bioRef = useRef(null);
    const ageRef = useRef(null);

    const validateData = () => {
        const newErrors = {};
        if (!nameRef.current.value.trim()) {
            newErrors.username = "Username is required";
        }
        if (passRef.current.value.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }
        if (ageRef.current.value.length < 5) {
            newErrors.biography = "Your age can't be lower than 5 years old";
        }
        if (bioRef.current.value.length > 200) {
            newErrors.biography = "Biography must be under 200 characters";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert(JSON.stringify(errors)); //ugly but works for now
        } else {
            updateDetails();
        }
    }

    const updateDetails = () => {
        //updates the profile's details in db
        alert("Profile Details updated.");
    }

    const togglePreview = () => {
        setPreview(p => !p);
    }

    const userPreProfile = {
        username : "Pieter Venter",
        age: 20,
        biography: "The data that would have been taken from db as Biography data:)",
        following: [
            {
                username: "Karma Tanner",
                playlists: [
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
                ] 
            },
            {
                username: "Beethoven",
                playlists: []
            }
        ],
        followers: [
            {
                username: "Megan Keller"
            },
            {
                username: "Jimmy Hull"
            }
        ],
        playlists: [
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
        ]
    };

    return (
        loginStatus && !preview ?
        <>
            <NavBar loggedIn={loggedIn}/>
            <div className="profile-div">
                <h1 className="playlists-h1">Logged in as: {username}</h1>
                <div className="profile-block">
                    <button className="add-btn" onClick={togglePreview}>Switch view</button>
                    <div className="profile-pic-div">
                        <p className="profile-p">Your Details:</p>
                        <img className="profile-pic" src="" alt="Profile Pic"></img>
                    </div>  
                    <div className="profile-data-div">
                        <label className="profile-label">Username: </label>
                        <input className="profile-input" type="text" ref={nameRef} defaultValue={username}></input>
                    </div>
                    <div className="profile-data-div">
                        <label className="profile-label">Password: </label>
                        <input className="profile-input" type="text" ref={passRef} defaultValue="MyPassword123"></input>
                    </div>
                    <div className="profile-data-div">
                        <label className="profile-label">Age: </label>
                        <input className="profile-input" type="number" ref={ageRef} defaultValue={20}></input>
                    </div>
                    <div className="profile-data-div">
                        <label className="profile-label">Biography: </label>
                        <textarea className="profile-textarea" ref={bioRef} defaultValue="Some data about me!!"></textarea>
                    </div>
                </div>
                <div className="profile-btns">
                    <button className="profile-delete-btn"><u>Delete account</u></button>
                    <button className="profile-save-btn" onClick={validateData}>Save Details</button>
                </div>
            </div>
        </>
        :
        <>
            <NavBar></NavBar>

            <div className="profile-div">
                <button className="add-btn" onClick={togglePreview}>Switch view</button>
                <ProfilePreview userprof={userPreProfile}></ProfilePreview>
            </div>
        </>
    );
}

export default Profile;