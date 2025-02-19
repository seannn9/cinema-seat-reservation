import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/favicon32.png";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                    <h1>FilmReserve</h1>
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/login" className="login-btn">
                    Login
                </Link>
            </div>
        </nav>
    );
}
