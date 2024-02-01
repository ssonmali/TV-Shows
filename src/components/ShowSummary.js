import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ShowSummary = () => {
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setSummary(data.summary);
        setImageUrl(data.image ? data.image.medium : "placeholder_image_url");
      } catch (error) {
        console.error("Error fetching summary: ", error);
      }
    };

    fetchSummary();
  }, [id]);

  return (
    <div className="show-summary-container">
      <div className="show-summary">
        <h1>Show Summary</h1>
        {imageUrl && <img src={imageUrl} alt="Show" />}
        <div dangerouslySetInnerHTML={{ __html: summary }} />
        <Link to={`/book/${id}`}>
          <button className="book-ticket-btn">Book Tickets</button>
        </Link>
      </div>
    </div>
  );
};

export default ShowSummary;
