import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import MovieCard from "../components/MovieCard";

export default function Dashboard() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            console.log("Logged in");
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:5001/getmovie").then((response) => {
            setMovies(response.data);
        });
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <section className="dashboard-section">
                <h1>Now Showing</h1>
                <div className="movies">
                    {movies.map((movie, key) => (
                        <MovieCard
                            key={key}
                            image={movie.poster}
                            title={movie.title}
                            release={movie.release_date}
                            duration={movie.duration}
                            genre={movie.genre}
                            price={movie.price}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
