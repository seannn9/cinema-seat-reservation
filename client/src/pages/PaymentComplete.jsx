import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function PaymentComplete() {
    const navigate = useNavigate();

    return (
        <div className="payment-container">
            <Navbar />
            <section className="payment-section">
                <h1>Payment Succesful</h1>
                <button onClick={() => navigate("/dashboard")}>
                    Go Back to Dashboard
                </button>
            </section>
        </div>
    );
}
