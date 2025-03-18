import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function About() {
    return (
        <div className="about-container">
            <Navbar />
            <section className="about-section">
                <div className="about-content">
                    <h1>
                        About <span className="accent">ReelTime</span>
                    </h1>

                    <div className="mission-vision">
                        <div className="card">
                            <FontAwesomeIcon
                                icon="fa-solid fa-bullseye"
                                className="icon"
                            />
                            <h2>Our Mission</h2>
                            <p>
                                To revolutionize the movie-going experience by
                                providing a seamless, stress-free seat
                                reservation system that puts the power of choice
                                in our customers' hands.
                            </p>
                        </div>

                        <div className="card">
                            <FontAwesomeIcon
                                icon="fa-solid fa-eye"
                                className="icon"
                            />
                            <h2>Our Vision</h2>
                            <p>
                                To become the leading platform for cinema seat
                                reservations, making every movie experience
                                memorable from the moment you choose your seat.
                            </p>
                        </div>
                    </div>

                    <div className="features">
                        <h2>Why Choose ReelTime?</h2>
                        <div className="feature-grid">
                            <div className="feature-card">
                                <FontAwesomeIcon
                                    icon="fa-solid fa-couch"
                                    className="icon"
                                />
                                <h3>Perfect Seat Selection</h3>
                                <p>
                                    Choose your ideal seat from our interactive
                                    seating chart
                                </p>
                            </div>
                            <div className="feature-card">
                                <FontAwesomeIcon
                                    icon="fa-solid fa-clock"
                                    className="icon"
                                />
                                <h3>Real-Time Availability</h3>
                                <p>See seat availability updates instantly</p>
                            </div>
                            <div className="feature-card">
                                <FontAwesomeIcon
                                    icon="fa-solid fa-wallet"
                                    className="icon"
                                />
                                <h3>Secure Payments</h3>
                                <p>
                                    Multiple payment options with secure
                                    processing
                                </p>
                            </div>
                            <div className="feature-card">
                                <FontAwesomeIcon
                                    icon="fa-solid fa-ticket"
                                    className="icon"
                                />
                                <h3>Digital Tickets</h3>
                                <p>Instant ticket delivery to your device</p>
                            </div>
                        </div>
                    </div>

                    <div className="cta-section">
                        <h2>Ready to Experience the Difference?</h2>
                        <Link to="/login" className="cta-button">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
