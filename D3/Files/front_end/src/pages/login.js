// Pieter Venter u23896257
import React, { useState, useRef } from "react";
import { NavBar } from "../components/navbar";
import { useNavigate } from "react-router-dom";
import ShowPass from "../../public/assets/images/ShowPass.png";
import HidePass from "../../public/assets/images/HidePass.png";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const pass = passwordRef.current.value;

        const response = await fetch(`http://localhost:3005/getUser/${username}`);

        if (!response.ok) {
            throw new Error("Something went wrong with the call to the API");
        }

        const userData = await response.json();

        if (userData[0].password === pass) {
            navigate(`/home/${username}`);
        } else {
            alert("Incorrect Login details.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <NavBar />
            <h1 className="login-h1">Login: </h1>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="inline-div">
                    <label>Username: </label>
                    <input
                        type="text"
                        className="input-text"
                        ref={usernameRef}
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
                <button className="submit-btn" type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;