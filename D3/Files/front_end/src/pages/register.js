// Pieter Venter u23896257
import React, { useRef, useState } from "react";
import { NavBar } from "../components/navbar";
import { useNavigate } from "react-router-dom";
import ShowPass from "../../public/assets/images/ShowPass.png";
import HidePass from "../../public/assets/images/HidePass.png";

const Register = () => {
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const retypePassRef = useRef();

    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const pass = passwordRef.current.value;

        if (pass !== retypePassRef.current.value) {
            return alert("Please ensure both passwords are the same");
        }

        const response = await fetch(`http://localhost:3005/registerUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: pass,
                age: 21,
                bio: "The default bio for now"
            }),
        });

        if (!response.ok) {
            alert("Username already exists, account creation failed");
        } else {
            alert("Account created");
            navigate(`/profile/${username}`);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <NavBar />
            <h1 className="login-h1">Register for SickBeats!</h1>
            <form className="login-form" onSubmit={handleRegister}>
                <div className="inline-div">
                    <label>Username: </label>
                    <input
                        type="text"
                        ref={usernameRef}
                        className="input-text"
                        placeholder="Type your username here..."
                        required
                    />
                </div>
                <div className="inline-div">
                    <label>Password: </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="input-text"
                        ref={passwordRef}
                        placeholder="Type your password here..."
                        required
                        minLength={8}
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="show-pass">
                        <img src={showPassword ? HidePass : ShowPass} alt="Toggle Password Visibility" />
                    </button>
                </div>
                <div className="inline-div">
                    <label>Retype Password: </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        ref={retypePassRef}
                        className="input-text"
                        placeholder="Retype password here..."
                        required
                        minLength={8}
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="show-pass">
                        <img src={showPassword ? HidePass : ShowPass} alt="Toggle Password Visibility" />
                    </button>
                </div>
                <button className="submit-btn" type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
