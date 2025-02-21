import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
                            <h1>{ticket.movie}</h1>
                            <p>{ticket.location}</p>
                            <p>{ticket.date}</p>
                            <p>{ticket.time}</p>
                            <p>₱{ticket.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
