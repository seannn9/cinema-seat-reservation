import "../styles/Welcome.css";
import Navbar from "../components/Navbar";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <Navbar />
            <section className="welcome-section">
                <div className="welcome-msg">
                    <h1>
                        <strong>The Perfect Seat.</strong>
                    </h1>
                    <h1>Just A Click Away</h1>
                    <p>
                        Skip the lines and reserve your seat online. <br />
                        Enjoy your movie, stress-free!
                    </p>
                </div>
                <button className="welcome-btn">Get Started</button>
            </section>
        </div>
    );
}
