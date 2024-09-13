// Pieter Venter u23896257
import React from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export class Splash extends React.Component {
    

    render() {
        return(
            <div className="splash-div">
                <img className="splash-img" src={Logo} alt="logo"/>
                <div className="splash-login">
                    <Link to="/login"><button className="signin-btn">Sign in</button></Link>
                    <Link to="/register"><button className="register-btn">Register</button></Link>
                </div>
            </div>
        );
    }
}