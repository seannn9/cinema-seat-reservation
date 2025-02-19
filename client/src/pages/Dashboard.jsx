import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            Axios.get(`http://localhost:5001/getusername/${userid}`).then(
                (response) => {
                    setUsername(response.data[0].username);
                }
            );
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
            <h3>{username}</h3>
        </div>
    );
}
