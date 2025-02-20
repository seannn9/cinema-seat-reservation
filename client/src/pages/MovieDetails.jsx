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
    const [price, setPrice] = useState(0);
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
                            <h4 onClick={() => setSelectedMall("SM Trece")}>
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                &nbsp; SM Trece
                            </h4>
                            <h4 onClick={() => setSelectedMall("SM Dasma")}>
                                {" "}
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                &nbsp; SM Dasma
                            </h4>
                            <h4 onClick={() => setSelectedMall("SM Tanza")}>
                                {" "}
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                &nbsp; SM Tanza
                            </h4>
                        </div>
                    </div>
                    <div
                        className="date-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Date</h2>
                        <div className="date-list">
                            <h4 onClick={() => setSelectedDate("Feb 21")}>
                                Feb 21
                            </h4>
                            <h4 onClick={() => setSelectedDate("Feb 22")}>
                                Feb 22
                            </h4>
                            <h4 onClick={() => setSelectedDate("Feb 23")}>
                                Feb 23
                            </h4>
                            <h4 onClick={() => setSelectedDate("Feb 24")}>
                                Feb 24
                            </h4>
                        </div>
                    </div>
                    <div
                        className="time-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Time</h2>
                        <div className="time-list">
                            <h4 onClick={() => setSelectedTime("10:30 AM")}>
                                10:30 AM
                            </h4>
                            <h4 onClick={() => setSelectedTime("12:00 PM")}>
                                12:00 PM
                            </h4>
                            <h4 onClick={() => setSelectedTime("1:30 PM")}>
                                1:30 PM
                            </h4>
                            <h4 onClick={() => setSelectedTime("3:00 PM")}>
                                3:00 PM
                            </h4>
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
                        <p style={{ textAlign: "right" }}>
                            Total Price: {price}
                        </p>
                        <button>Proceed to Payment</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
