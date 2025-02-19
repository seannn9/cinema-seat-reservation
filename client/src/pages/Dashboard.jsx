import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            console.log(userid);
        } else {
            navigate("/login");
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div>
            Dashboard
            <button onClick={logout}>Logout</button>
        </div>
    );
}
