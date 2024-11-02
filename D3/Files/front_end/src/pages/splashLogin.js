//Pieter Venter u23896257
import React from "react"
import { Splash } from "../components/splash";
import { NavBar } from "../components/navbar";

export class SplashLogin extends React.Component {

    render(){
        return(
            <div className="splash">
               <NavBar/>
               <Splash/>          
            </div>
        );
    }
}