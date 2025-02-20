import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
    const { state } = useLocation();

    return (
        <div className="movie-details-container">
            <Navbar />
            <section className="movie-details-section">
                <div className="theater-details">
                    <div
                        className="theater-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Theater</h2>
                        <div className="theater-list">
                            <h3>SM Trece</h3>
                            <h3>SM Dasma</h3>
                            <h3>SM Tanza</h3>
                        </div>
                    </div>
                    <div
                        className="date-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Date</h2>
                        <div className="date-list">
                            <h3>Date 1</h3>
                            <h3>Date 2</h3>
                            <h3>Date 3</h3>
                            <h3>Date 4</h3>
                        </div>
                    </div>
                    <div
                        className="time-list-container"
                        style={{ width: "100%" }}
                    >
                        <h2>Time</h2>
                        <div className="time-list">
                            <h3>Time 1</h3>
                            <h3>Time 2</h3>
                            <h3>Time 3</h3>
                            <h3>Time 4</h3>
                        </div>
                    </div>
                </div>
                <div className="order-details">
                    <div className="movie-details-content">
                        <div className="movie-poster">
                            <img src={state.image} alt={state.title} />
                        </div>
                        <div className="details">
                            <h1>{state.title}</h1>
                            <div className="info">
                                <p>Duration: {state.duration}</p>
                                <p>Genre: {state.genre}</p>
                                <p>Release: {state.release}</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-confirmation">
                        <h2>SM Trece</h2>
                        <h3>Feb 21, 2025</h3>
                        <p>12:00pm</p>
                        <button>Proceed to Payment</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
