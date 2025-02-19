import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileDropdown.css";

export default function ProfileDropdown({ username }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {}, [isOpen]);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="profile-dropdown">
            <button
                className="profile-icon"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {username}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <button>Settings</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}
