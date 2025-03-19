import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Tickets.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            console.log("Logged in");

            setUsername(localStorage.getItem("username"));

            Axios.post("http://localhost:5001/getusertickets", {
                userid: localStorage.getItem("userid"),
            }).then((response) => {
                setTickets(response.data);
            });

            if (tickets.length === 0) {
                console.log("No tickets found");
            }
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="tickets-container">
            <Navbar />
            <div className="tickets-section">
                <h1>
                    <span style={{ color: "white" }}>{username}'s</span> Tickets
                </h1>
                <div className="tickets">
                    {tickets.map((ticket, key) => (
                        <div className="ticket" key={key}>
                            <div className="ticket-header">
                                <span className="ticket-number">
                                    #{ticket.ticketid}
                                </span>
                                <h2 className="movie-title">{ticket.movie}</h2>
                            </div>
                            <div className="ticket-info">
                                <div className="info-group">
                                    <div className="info-item">
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-location-dot"
                                            className="info-icon"
                                        />
                                        <span className="label">Theater:</span>
                                        <span className="value">
                                            {ticket.location}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-calendar-days"
                                            className="info-icon"
                                        />
                                        <span className="label">Date:</span>
                                        <span className="value">
                                            {ticket.date}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-clock"
                                            className="info-icon"
                                        />
                                        <span className="label">Time:</span>
                                        <span className="value">
                                            {ticket.time}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-couch"
                                            className="info-icon"
                                        />
                                        <span className="label">Seats:</span>
                                        <span className="value">
                                            {ticket.seats}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-peso-sign"
                                            className="info-icon"
                                        />
                                        <span className="label">Price:</span>
                                        <span className="value">
                                            ₱{ticket.price}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-wallet"
                                            className="info-icon"
                                        />
                                        <span className="label">
                                            Payment Method
                                        </span>
                                        <span className="value">
                                            {ticket.payment_method}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
