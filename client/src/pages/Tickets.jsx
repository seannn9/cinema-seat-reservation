import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Tickets.css";

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
                <h1>{username}'s Tickets</h1>
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
                                        <span className="label">Theater:</span>
                                        <span className="value">
                                            {ticket.location}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Date:</span>
                                        <span className="value">
                                            {ticket.date}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Time:</span>
                                        <span className="value">
                                            {ticket.time}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Seats:</span>
                                        <span className="value">
                                            {ticket.seats}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Price:</span>
                                        <span className="value">
                                            ₱{ticket.price}
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
