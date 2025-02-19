import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src="" alt="logo" />
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}
