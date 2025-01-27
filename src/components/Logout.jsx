import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import './Logout.css';

function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());
  const [user, setUser] = useState({ name: "", email: "" });
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch user's location on component mount
  useEffect(() => {
    fetchPosition();
  }, []);

  // Function to fetch the user's location
  const fetchPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          console.error("Error fetching location: ", err);
          setStatusMessage("Error fetching location.");
        }
      );
    } else {
      setStatusMessage("Geolocation is not supported by your browser.");
    }
  };

  // Format the date and time for display
  const formatDateTime = (date) => date.toLocaleString();

  // Store logout time in the database
  const storeLogoutTime = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No JWT token found. Please log in again.");
      return;
    }

    const currentTime = new Date();
    const formattedLogoutTime = currentTime.toLocaleString();

    const name = inputName || user.name;
    const email = inputEmail || user.email;

    if (!email || !name) {
      console.error("User name or email is missing!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/logout",
        {
          logoutTimes: formattedLogoutTime,
          email: email,
          latitude: latitude || "N/A",
          longitude: longitude || "N/A",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStatusMessage(response.data.message);
      console.log("Logout time stored successfully:", response.data);
    } catch (error) {
      console.error("Error storing logout time:", error.response?.data || error.message);
      setStatusMessage("Error storing logout time.");
    }
  };

  return (
    <>
    <Navbar/>
    <div>
      <h1 >Store Logout Time</h1>

      <div>
        <label>
          Name:
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your name"
          
          />
        </label>
        <br />
        <label >
          Email:
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Enter your email"
           
          />
        </label>
      </div>

      <h2 >Current Date and Time</h2>
      <p >
        {formatDateTime(dateTime)}
      </p>

      <button
        onClick={storeLogoutTime}
       
      >
        Store Logout Time
      </button>

      {statusMessage && (
        <p >
          {statusMessage}
        </p>
      )}

      <div>
        <h1 >Your Location</h1>
        {latitude && longitude ? (
          <div>
            <h3>Location:</h3>
            <p >Latitude: {latitude}</p>
            <p >Longitude: {longitude}</p>
          </div>
        ) : (
          <p >Fetching your location...</p>
        )}
      </div>
    </div>
    </>
  );
}

export default DateTimeDisplay;
