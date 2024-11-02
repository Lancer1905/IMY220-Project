// Pieter Venter u23896257
import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import NavHelper from './profile_nav';


export class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            loggedIn : this.props.loggedIn ? true : false, 
            username: this.props.username
        };
    }

    login() {
        this.setState({loggedIn:true});
    }

    logout(){
        this.setState({loggedIn:false});
    }
    
    render() {
        return( 
            <nav className="nav-bar">
                <Link to="/" className="nav-logo-link"><img className="nav-logo" src={logo} alt="logo"></img></Link>
                
                {!this.state.loggedIn ? ( 
                <div className="nav-buttons">
                    <NavHelper isLoggedIn={this.state.loggedIn} />
                    <Link to="/login"><button onClick={this.login} className="signin-btn">Sign in</button></Link>
                    <Link to="/register"><button className="register-btn">Register</button></Link>
                </div>):(
                <div className="nav-buttons">
                    <NavHelper isLoggedIn={this.state.loggedIn} username={this.state.username}></NavHelper>
                    <Link to="/"><button className="logout-btn" onClick={this.logout}>Logout</button></Link>
                </div>)}
            </nav>);
    }
}