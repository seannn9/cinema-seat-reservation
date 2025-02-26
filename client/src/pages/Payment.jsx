import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import "../styles/Payment.css";

export default function PaymentComplete() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            console.log("Logged in");
        } else {
            navigate("/login");
        }
    }, []);

    const handlePayment = () => {
        if (!isProcessing) {
            setIsProcessing(true);
            Axios.post("http://localhost:5001/processpayment", {
                movie: state.movie,
                location: state.location,
                date: state.date,
                time: state.time,
                price: state.price,
                userid: localStorage.getItem("userid"),
            })
                .then((response) => {
                    if (response.data === "Payment successful!") {
                        setPaymentStatus("Payment successful!");
                        console.log(paymentStatus);
                        navigate("/tickets");
                    } else {
                        setPaymentStatus("Payment failed!");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsProcessing(false);
                });
        }
    };

    return (
        <div className="payment-container">
            <Navbar />
            <section className="payment-section">
                {isProcessing ? <p>Processing...</p> : <p>{paymentStatus}</p>}
                <div className="payment-method">
                    <h1>Payment Method</h1>
                </div>
                <div className="order-summary">
                    <h2>Booking Detail</h2>
                </div>
                <div className="payment">
                    <button onClick={handlePayment}>Pay Now</button>
                </div>
            </section>
        </div>
    );
}
