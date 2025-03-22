import { useEffect, useState } from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import MovieCard from "../components/MovieCard";

export default function Dashboard() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const response = await Axios.post(
                    "http://localhost:5001/getshowingmovies"
                );
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <section className="dashboard-section">
                <h1>
                    <span style={{ color: "white" }}>Now</span> Showing
                </h1>
                <div className="movies">
                    {isLoading ? (
                        // Loading skeleton
                        [...Array(8)].map((_, index) => (
                            <div
                                key={index}
                                className="loading-skeleton"
                                style={{
                                    height: "380px",
                                    width: "100%",
                                }}
                            />
                        ))
                    ) : movies.length > 0 ? (
                        movies.map((movie, key) => (
                            <MovieCard
                                key={key}
                                movieid={movie.movieid}
                                image={movie.poster}
                                title={movie.title}
                                release={movie.release_date}
                                duration={movie.duration}
                                genre={movie.genre}
                                price={movie.price}
                            />
                        ))
                    ) : (
                        <div
                            style={{
                                gridColumn: "1 / -1",
                                textAlign: "center",
                                padding: "2rem",
                            }}
                        >
                            No movies currently showing
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
