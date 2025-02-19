import "../styles/Welcome.css";
import Navbar from "../components/Navbar";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <Navbar />
            <div className="welcome-section">Welcome</div>
        </div>
    );
}
