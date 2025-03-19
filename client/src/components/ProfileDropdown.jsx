import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/ProfileDropdown.css";

export default function ProfileDropdown({ username }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();

        // const { pathname } = location;
        if (pathname === "/") {
            window.location.reload();
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        const adminid = localStorage.getItem("adminid");
        if (adminid) {
            setIsAdmin(true);
        }
    }, []);

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
                    {isAdmin && (
                        <button
                            className={pathname === "/admin" ? "active" : ""}
                            onClick={() => navigate("/admin")}
                        >
                            Manage
                        </button>
                    )}
                    <button
                        className={pathname === "/dashboard" ? "active" : ""}
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </button>
                    {!isAdmin && (
                        <>
                            <button
                                className={
                                    pathname === "/tickets" ? "active" : ""
                                }
                                onClick={() => navigate("/tickets")}
                            >
                                Tickets
                            </button>
                            <button
                                className={
                                    pathname === "/about" ? "active" : ""
                                }
                                onClick={() => navigate("/about")}
                            >
                                About
                            </button>
                        </>
                    )}
                    <button onClick={() => setShowLogoutModal(true)}>
                        Logout
                    </button>
                </div>
            )}
            {showLogoutModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>
                            Log out of{" "}
                            <span style={{ color: "var(--primary-color)" }}>
                                ReelTime
                            </span>
                            ?
                        </h2>
                        <form onSubmit={handleLogout}>
                            <div className="modal-buttons">
                                <button type="submit">Log Out</button>
                                <button
                                    type="button"
                                    onClick={() => setShowLogoutModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
