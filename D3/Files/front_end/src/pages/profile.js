// Pieter Venter u23896257
import React, { useState, useRef, useEffect } from "react";
import { NavBar } from "../components/navbar";
import { useParams } from "react-router-dom";
import { ProfilePreview } from "../components/profilePreview";
import { Playlist } from "../components/playlist";

import p0 from "../../public/assets/images/pfp0.png";
import p1 from "../../public/assets/images/pfp1.png";
import p2 from "../../public/assets/images/pfp2.jpg";

const Profile = ({ loggedIn }) => {
    const [errors, setErrors] = useState(null);
    const [preview, setPreview] = useState(false);
    const [userData, setUserData] = useState(null);
    const [photo, setPhoto] = useState("");
    const [loginStatus, setLoginS] = useState(loggedIn ? loggedIn : false);
    const [loading, setLoading] = useState(true); // Loading state

    const { username } = useParams();
    const nameRef = useRef(null);
    const passRef = useRef(null);
    const bioRef = useRef(null);
    const ageRef = useRef(null);
    const photoRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3005/getUser/${username}`);
                if (!response.ok) {
                    throw new Error("User not found");
                }
                const data = await response.json();
                setUserData(data[0]);
                setPhoto(data[0].photo);
                console.log(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setErrors("Error fetching user data");
            } finally {
                setLoading(false); 
            }
        };

        fetchUserData();
    }, [username]);

    const validateData = () => {
        const newErrors = {};
        if (!nameRef.current.value.trim()) {
            newErrors.username = "Username is required";
        }
        if (passRef.current.value.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }
        if (ageRef.current.value < 5) {
            newErrors.age = "Your age can't be lower than 5 years old";
        }
        if (bioRef.current.value.length > 200) {
            newErrors.biography = "Biography must be under 200 characters";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert(JSON.stringify(newErrors)); // Show the new errors
        } else {
            setUserData((prevUserData) => ({
                ...prevUserData, 
                username: nameRef.current.value.trim(),
                password: passRef.current.value,
                age: ageRef.current.value,
                biography: bioRef.current.value,
                photo: photoRef.current.value
            }));
            updateDetails();
        }
    };

    const updateDetails = async() => {

        const response = await fetch(`http://localhost:3005/editUser/${userData.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userData}),
        });

        const msg = await response.json();
        alert(msg.status);
    };

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:3005/deleteUser`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userData.id }),
        });

        const msg = await response.json();
        alert(msg.msg);
    }

    const togglePreview = () => {
        setPreview((p) => !p);
    };
    
    const randomPhoto = () =>{
        const randPhoto = Math.floor(Math.random() * 3);
        switch(randPhoto){

            case 0: return p0;
        
            case 1: return p1;
                
            case 2: return p2 
        }
    }

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        loginStatus && !preview ? (
            <>
                <NavBar loggedIn={loggedIn} username={username} />
                <div className="profile-div">
                    <h1 className="playlists-h1">Logged in as: {username}</h1>
                    <div className="profile-block">
                        <button className="add-btn" onClick={togglePreview}>Switch view</button>
                        <div className="profile-pic-div">
                            <p className="profile-p">Your Details:</p>
                            {photo!=="" ? 
                                <img className="profile-pic" src={`data:image/jpeg;base64,${photo}`} alt="Profile Pic" />
                                :
                                <img className="profile-pic" src={randomPhoto()} alt="Failed Pic"></img>
                            }
                        </div>
                        <div className="profile-data-div">
                            <label className="profile-label">Username: </label>
                            <input className="profile-input" type="text" ref={nameRef} defaultValue={username} />
                        </div>
                        <div className="profile-data-div">
                            <label className="profile-label">Password: </label>
                            <input className="profile-input" type="text" ref={passRef} defaultValue={userData.password} />
                        </div>
                        <div className="profile-data-div">
                            <label className="profile-label">Age: </label>
                            <input className="profile-input" type="number" ref={ageRef} defaultValue={userData.age} />
                        </div>
                        <div className="profile-data-div">
                            <label className="profile-label">Biography: </label>
                            <textarea className="profile-textarea" ref={bioRef} defaultValue={userData.biography}></textarea>
                        </div>
                    </div>
                    <div className="profile-btns">
                        <button className="profile-delete-btn" onClick={handleDelete}><u>Delete account</u></button>
                        <button className="profile-save-btn" onClick={validateData}>Save Details</button>
                    </div>
                </div>
            </>
        ) : (
            <>
                    <NavBar loggedIn={loggedIn} username={username }/>
                <div className="profile-div">
                    <button className="add-btn" onClick={togglePreview}>Switch view</button>
                    {userData ? ( 
                        <ProfilePreview userprof={userData} />
                    ) : (
                        <div>Loading user data...</div> 
                    )}
                </div>
            </>
        )
    );
};

export default Profile;
