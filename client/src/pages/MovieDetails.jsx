import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovieDetails() {
    const { state } = useLocation();
    const [selectedMall, setSelectedMall] = useState("Select Theater");
    const [selectedDate, setSelectedDate] = useState("Select Date");
    const [selectedTime, setSelectedTime] = useState("Select Time");

    return (
        <div className="movie-details-container">
            <Navbar />
            <section className="movie-details-section">
                <div className="theater-details">
                    <div
                        className="theater-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Theater</h2>
                        <div className="theater-list">
                            <h3 onClick={() => setSelectedMall("SM Trece")}>
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                &nbsp; SM Trece
                            </h3>
                            <h3 onClick={() => setSelectedMall("SM Dasma")}>
                                {" "}
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                &nbsp; SM Dasma
                            </h3>
                            <h3 onClick={() => setSelectedMall("SM Tanza")}>
                                {" "}
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                &nbsp; SM Tanza
                            </h3>
                        </div>
                    </div>
                    <div
                        className="date-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Date</h2>
                        <div className="date-list">
                            <h3 onClick={() => setSelectedDate("Feb 21")}>
                                Feb 21
                            </h3>
                            <h3 onClick={() => setSelectedDate("Feb 22")}>
                                Feb 22
                            </h3>
                            <h3 onClick={() => setSelectedDate("Feb 23")}>
                                Feb 23
                            </h3>
                            <h3 onClick={() => setSelectedDate("Feb 24")}>
                                Feb 24
                            </h3>
                        </div>
                    </div>
                    <div
                        className="time-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Time</h2>
                        <div className="time-list">
                            <h3 onClick={() => setSelectedTime("10:30 AM")}>
                                10:30 AM
                            </h3>
                            <h3 onClick={() => setSelectedTime("12:00 PM")}>
                                12:00 PM
                            </h3>
                            <h3 onClick={() => setSelectedTime("1:30 PM")}>
                                1:30 PM
                            </h3>
                            <h3 onClick={() => setSelectedTime("3:00 PM")}>
                                3:00 PM
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="order-details">
                    <div className="movie-details-content">
                        <div className="movie-poster">
                            <img src={state.image} alt={state.title} />
                        </div>
                        <div className="details">
                            <h1>{state.title}</h1>
                            <div className="info">
                                <p>Duration: {state.duration}</p>
                                <p>Genre: {state.genre}</p>
                                <p>Release: {state.release}</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-confirmation">
                        <h2>{selectedMall}</h2>
                        <h3>{selectedDate}</h3>
                        <p>{selectedTime}</p>
                        <button>Proceed to Payment</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
