//Pieter Venter u23896257
import React from "react";
import { SplashLogin } from "./pages/splashLogin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/profile";
import Login from "./pages/login";
import  Home  from "./pages/home"; // functional component cause it did not want to work as a class
import Playlists from "./pages/playlists";
import PlaylistPage from "./pages/playlist";
import { Contact } from "./pages/contact";
import Community from "./pages/community";
import Register from "./pages/register";
// moet dynamic routes mooi opstel hierso vir playlist, profile, en playlists


const router = createBrowserRouter([
    {
        path: "/",
        element: <SplashLogin />
    },
    {
        path: "/profile/:username",
        element: <Profile loggedIn={true}/>
    },
    {
        path: "/profilePre/:username",
        element: <Profile loggedIn={false} />
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/home/:username",
        element: <Home/>
    },
    {
        path: "/playlists/:username",
        element: <Playlists/>
    },
    {
        path: "/playlist/:name",
        element: <PlaylistPage/>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/community",
        element: <Community />
    },
    {
        path:"/contact",
        element: <Contact/>
    },
    {
        path: "*",
        element: <SplashLogin />
    }
]);

export class App extends React.Component {

    render() {
        return (
            <RouterProvider router={router}>

            </RouterProvider>
        );
    }
}