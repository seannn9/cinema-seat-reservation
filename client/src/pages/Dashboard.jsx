import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            console.log("Logged in");
        } else {
            navigate("/login");
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            <Navbar />
            <div>
                Dashboard
                <button onClick={logout}>Logout</button>
            </div>
        </>
    );
}
