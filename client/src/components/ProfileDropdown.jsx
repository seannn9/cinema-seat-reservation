import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/ProfileDropdown.css";

export default function ProfileDropdown({ username }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();

        const { pathname } = location;
        if (pathname === "/") {
            window.location.reload();
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="profile-dropdown" ref={dropdownRef}>
            <button
                className="profile-icon"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <FontAwesomeIcon
                    icon="fa-solid fa-user"
                    style={{ scale: "1.75" }}
                />
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <p style={{ color: "var(--primary-color)" }}>{username}</p>
                    <button>Settings</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}
