import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import MovieCard from "../components/MovieCard";
// dummy movie posters
import ca4 from "../assets/movies/ca4.jpg";
import sonic3 from "../assets/movies/sonic3.jpg";
import flow from "../assets/movies/flow.jpg";
import monkey from "../assets/movies/monkey.jpg";

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

    return (
        <div className="dashboard-container">
            <Navbar />
            <section className="dashboard-section">
                <h1>Now Showing</h1>
                <div className="movies">
                    <MovieCard
                        image={ca4}
                        title="Captain America: Brave New World"
                        release="2025"
                    />
                    <MovieCard
                        image={sonic3}
                        title="Sonic the Hedgehog 3"
                        release="2025"
                    />
                    <MovieCard image={flow} title="Flow" release="2025" />
                    <MovieCard
                        image={monkey}
                        title="The Monkey"
                        release="2025"
                    />
                </div>
            </section>
        </div>
    );
}
