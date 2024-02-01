import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();
        // Filter out shows without images
        const filteredShows = data.filter((show) => show.show.image);
        setShows(filteredShows);
      } catch (error) {
        console.error("Error fetching shows: ", error);
      }
    };

    fetchShows();
  }, []);

  const filterGenres = (genres) => {
    return genres.slice(0, 2).join(", "); // Display only the first two genres
  };

  return (
    <div className="show-list-container">
      <h1 className="show-list-title">TV Shows</h1>
      <div className="show-grid">
        {shows.map((show) => (
          <div key={show.show.id} className="show-item">
            {show.show.image && (
              <img src={show.show.image.medium} alt={show.show.name} className="show-item-image" />
            )}
            <div className="show-item-details">
              <h3 className="show-item-title">{show.show.name}</h3>
              {show.show.genres && (
                <p className="show-item-genre">Genre: {filterGenres(show.show.genres)}</p>
              )}
              <Link to={`/show/${show.show.id}`} className="show-item-link">Show Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
