import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovieDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [selectedMall, setSelectedMall] = useState("Select Theater");
    const [selectedDate, setSelectedDate] = useState("Select Date");
    const [selectedTime, setSelectedTime] = useState("Select Time");
    const [price, setPrice] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsDisabled(
            selectedMall === "Select Theater" ||
                selectedDate === "Select Date" ||
                selectedTime === "Select Time"
        );
    }, [selectedMall, selectedDate, selectedTime]);

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
                            <h4
                                onClick={() => setSelectedMall("SM Trece")}
                                className={
                                    selectedMall === "SM Trece" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                &nbsp; SM Trece
                            </h4>
                            <h4
                                onClick={() => setSelectedMall("SM Dasma")}
                                className={
                                    selectedMall === "SM Dasma" ? "active" : ""
                                }
                            >
                                {" "}
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                &nbsp; SM Dasma
                            </h4>
                            <h4
                                onClick={() => setSelectedMall("SM Tanza")}
                                className={
                                    selectedMall === "SM Tanza" ? "active" : ""
                                }
                            >
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
                            <h4
                                onClick={() => setSelectedDate("Feb 21")}
                                className={
                                    selectedDate === "Feb 21" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                &nbsp; Feb 21
                            </h4>
                            <h4
                                onClick={() => setSelectedDate("Feb 22")}
                                className={
                                    selectedDate === "Feb 22" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                &nbsp; Feb 22
                            </h4>
                            <h4
                                onClick={() => setSelectedDate("Feb 23")}
                                className={
                                    selectedDate === "Feb 23" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                &nbsp; Feb 23
                            </h4>
                            <h4
                                onClick={() => setSelectedDate("Feb 24")}
                                className={
                                    selectedDate === "Feb 24" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                &nbsp; Feb 24
                            </h4>
                        </div>
                    </div>
                    <div
                        className="time-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Time</h2>
                        <div className="time-list">
                            <h4
                                onClick={() => setSelectedTime("10:30 AM")}
                                className={
                                    selectedTime === "10:30 AM" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-clock" />
                                &nbsp; 10:30 AM
                            </h4>
                            <h4
                                onClick={() => setSelectedTime("12:00 PM")}
                                className={
                                    selectedTime === "12:00 PM" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-clock" />
                                &nbsp; 12:00 PM
                            </h4>
                            <h4
                                onClick={() => setSelectedTime("1:30 PM")}
                                className={
                                    selectedTime === "1:30 PM" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-clock" />
                                &nbsp; 1:30 PM
                            </h4>
                            <h4
                                onClick={() => setSelectedTime("3:00 PM")}
                                className={
                                    selectedTime === "3:00 PM" ? "active" : ""
                                }
                            >
                                <FontAwesomeIcon icon="fa-solid fa-clock" />
                                &nbsp; 3:00 PM
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
                        <h2>
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                            &nbsp; {selectedMall}
                        </h2>
                        <h3>
                            <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                            &nbsp; {selectedDate}
                        </h3>
                        <p>
                            {" "}
                            <FontAwesomeIcon icon="fa-solid fa-clock" />
                            &nbsp; {selectedTime}
                        </p>
                        <p style={{ textAlign: "right" }}>
                            Total Price: ₱{state.price}
                        </p>
                        <button
                            onClick={() => navigate("/payment")}
                            disabled={isDisabled}
                            className={isDisabled ? "disabled" : ""}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
