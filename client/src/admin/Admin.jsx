import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        const adminid = localStorage.getItem("adminid");
        if (!adminid) {
            navigate("/login");
        }
    }, []);

    return <div>Admin</div>;
}
