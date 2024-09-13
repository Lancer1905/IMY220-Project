// Pieter Venter u23896257
import React from "react";
import { NavBar } from "../components/navbar";
import { Link } from "react-router-dom";
import ShowPass from "../../public/assets/images/ShowPass.png";
import HidePass from "../../public/assets/images/HidePass.png"

export class Login extends React.Component {

    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);    
        this.showPassword = this.showPassword.bind(this);

        this.state = {
            showPassword : false
        };
    }

    handleLogin(e){
        e.preventDefualt();

        
    }
    
    showPassword(){
        this.setState({showPassword: !this.state.showPassword});        
    }

    render(){
        const username = "Pieter Venter";
        return (
            <>
                <NavBar></NavBar>
                <h1 className="login-h1" onSubmit={this.handleLogin}>Login: </h1>
                <form className="login-form">
                    <div className="inline-div">
                        <label>Username: </label>
                        <input type="text" className="input-text" placeholder="Type your username here..." required></input>
                    </div>
                    <div className="inline-div">
                        <label>Password: </label>
                        <input type={this.state.showPassword ? "text" : "password"}
                            className="input-text" placeholder="Type your password here..." required minLength={8}></input>
                        <button type="button" onClick={this.showPassword} className="show-pass">
                            <img src={this.state.showPassword ? HidePass : ShowPass}></img>
                        </button>
                    </div>
                    <Link to={`/home/${username}`}><button className="submit-btn" type="submit">Login</button></Link>
                </form>
            </>
        );
    }
}