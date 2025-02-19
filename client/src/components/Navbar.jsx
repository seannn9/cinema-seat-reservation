import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/favicon32.png";
import Axios from "axios";

export default function Navbar() {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            Axios.get(`http://localhost:5001/getusername/${userid}`).then(
                (response) => {
                    setUsername(response.data[0].username);
                }
            );
            setIsLoggedIn(true);
        }
    });

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                    <h1>FilmReserve</h1>
                </Link>
            </div>
            <div className="nav-links">
                {isLoggedIn ? (
                    <div>{username}</div>
                ) : (
                    <Link to="/login" className="login-btn">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
