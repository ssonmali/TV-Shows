import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TicketBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tickets: 1,
  });
  const [fare, setFare] = useState(0); // State for storing the fare
  const [showName, setShowName] = useState(""); // State for storing the show name
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // State for booking confirmation
  const { id } = useParams();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();

        setShowName(data.name);
      } catch (error) {
        console.error("Error fetching show details: ", error);
      }
    };

    fetchShowDetails();
  }, [id]);

  useEffect(() => {
    const generateRandomFare = () => {
      const baseFare = 10;
      const ticketMultiplier = 5;
      const totalFare = baseFare + ticketMultiplier * formData.tickets;
      setFare(totalFare);
    };

    generateRandomFare();
  }, [formData.tickets]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setBookingConfirmed(true);
    // Clear form data after submission if needed
    // setFormData({
    //   name: "",
    //   email: "",
    //   tickets: 1,
    // });
  };

  return (
    <div className="ticket-booking-container">
      <div className="ticket-booking-form">
        {!bookingConfirmed ? (
          <>
            <h1>Book Tickets for {showName}</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="tickets">Number of Tickets:</label>
                <input
                  type="number"
                  id="tickets"
                  name="tickets"
                  value={formData.tickets}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div>
                <label htmlFor="fare">Fare:</label>
                <input
                  type="text"
                  id="fare"
                  name="fare"
                  value={`$${fare}`}
                  readOnly
                />
              </div>
              <button type="submit">Book Now</button>
            </form>
          </>
        ) : (
          <div className="booking-confirmation">
            <h1>Thank you for booking tickets!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketBooking;
