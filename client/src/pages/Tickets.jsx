import { QRCodeSVG } from "qrcode.react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Tickets.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
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
        } else {
            navigate("/login");
        }
    }, []);

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
        setShowQRModal(true);
    };

    return (
        <div className="tickets-container">
            <Navbar />
            <div className="tickets-section">
                <h1>
                    <span style={{ color: "white" }}>{username}'s</span> Tickets
                </h1>
                <h3
                    style={{
                        marginTop: "0",
                        color: "#979494",
                        fontStyle: "italic",
                    }}
                >
                    Click on a ticket to access QR Code
                </h3>
                {tickets.length === 0 && (
                    <h2 style={{ fontStyle: "italic", color: "#979494" }}>
                        No Tickets Found
                    </h2>
                )}
                <div className="tickets">
                    {tickets.map((ticket, key) => (
                        <div
                            className="ticket"
                            key={key}
                            onClick={() => handleTicketClick(ticket)}
                            style={{ cursor: "pointer" }}
                        >
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

            {/* QR Code Modal */}
            {showQRModal && selectedTicket && (
                <div className="modal-overlay">
                    <div className="qr-modal">
                        <h2>Ticket #{selectedTicket.ticketid}</h2>
                        <div className="qr-code">
                            <QRCodeSVG
                                value={JSON.stringify({
                                    ticketId: selectedTicket.ticketid,
                                    movie: selectedTicket.movie,
                                    location: selectedTicket.location,
                                    date: selectedTicket.date,
                                    time: selectedTicket.time,
                                    seats: selectedTicket.seats,
                                })}
                                title={`#${selectedTicket.ticketid} : ${selectedTicket.movie}`}
                                size={200}
                                level="H"
                                imageSettings={{
                                    src: "../../public/favicon.ico",
                                    height: 32,
                                    width: 32,
                                    excavate: true,
                                    opacity: 1,
                                }}
                            />
                        </div>
                        <p className="qr-info">
                            Scan this QR code at the theater
                        </p>
                        <button onClick={() => setShowQRModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
