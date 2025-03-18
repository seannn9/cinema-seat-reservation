import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/favicon32.png";
import Axios from "axios";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        const adminid = localStorage.getItem("adminid");
        if (userid) {
            Axios.get(`http://localhost:5001/getusername/${userid}`).then(
                (response) => {
                    setUsername(response.data[0].username);
                    localStorage.setItem("username", response.data[0].username);
                }
            );
            setIsLoggedIn(true);
        }
        if (adminid) {
            setUsername("Admin");
            setIsLoggedIn(true);
        }
    });

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                    <h1>
                        Reel
                        <span style={{ color: "var(--primary-color)" }}>
                            Time
                        </span>
                    </h1>
                </Link>
            </div>
            <div className="nav-links">
                {localStorage.getItem("userid") &&
                    pathname !== "/dashboard" &&
                    pathname !== "/" && (
                        <Link to="/dashboard" className="dashboard-link">
                            Dashboard
                        </Link>
                    )}
                {isLoggedIn ? (
                    <ProfileDropdown username={username} />
                ) : (
                    <Link to="/login" className="login-btn">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
