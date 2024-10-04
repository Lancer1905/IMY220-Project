// Pieter Venter u23896257
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value); // Pass the search term to the parent component in real-time
    };

    return (
        <div className="search-bar">
            <input
                className="search-input"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search for a specific playlist/song"
            />
        </div>
    );
};

export default SearchBar;
