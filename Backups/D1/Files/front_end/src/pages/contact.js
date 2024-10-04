// Pieter Venter u23896257
import React from "react";
import { NavBar } from "../components/navbar";

export class Contact extends React.Component {



    render(){
        return (
            <>
                <NavBar></NavBar>
                <aside className="aside-div">
                    <div>
                        Having Problems?
                    </div>
                    <div>
                        <p>Contact us at: 072 928 3848</p>
                        <p>Email us: sickestbeats@gmail.com</p>
                        <p>Visit us at: Ridgeview shopping centre</p>
                    </div>
                </aside>
            </>
        );
    }
}