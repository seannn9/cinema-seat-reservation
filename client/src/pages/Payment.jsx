import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";

export default function PaymentComplete() {
    const navigate = useNavigate();
    const { state } = useLocation();
    // payment variables
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

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
                <button onClick={handlePayment}>Pay Now</button>
                {isProcessing ? <p>Processing...</p> : <p>{paymentStatus}</p>}
            </section>
        </div>
    );
}
