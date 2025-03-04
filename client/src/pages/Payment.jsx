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
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            console.log("Logged in");
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        const movieToPay = localStorage.getItem("movieToPay");
        if (movieToPay) {
            console.log(movieToPay);
        } else {
            navigate("/dashboard");
        }
    });

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
                {isProcessing && <p>Processing...</p>}

                <div className="payment-method">
                    <h2>Payment Method</h2>
                    <div className="methods">
                        <h4
                            onClick={() => setPaymentMethod("Credit")}
                            className={
                                paymentMethod === "Credit" ? "active" : ""
                            }
                        >
                            Credit Card
                        </h4>
                        <h4
                            onClick={() => setPaymentMethod("Bank")}
                            className={paymentMethod === "Bank" ? "active" : ""}
                        >
                            Bank Transfer
                        </h4>
                        <h4
                            onClick={() => setPaymentMethod("Gcash")}
                            className={
                                paymentMethod === "Gcash" ? "active" : ""
                            }
                        >
                            Gcash
                        </h4>
                    </div>
                    <div className="user-info">
                        <h4 className="payment-labels">Name</h4>
                        <input
                            type="text"
                            id="fullname"
                            className="payment-inputs"
                        />
                    </div>
                    {paymentMethod === "Gcash" && (
                        <div>
                            <h4 className="payment-labels">Gcash Number</h4>
                            <input
                                type="tel"
                                id="gcashnum"
                                className="payment-inputs"
                            />
                        </div>
                    )}
                    {paymentMethod === "Bank" && (
                        <div>
                            <h4 className="payment-labels">
                                Bank Account Number
                            </h4>
                            <input
                                type="tel"
                                id="banknum"
                                className="payment-inputs"
                            />
                        </div>
                    )}
                    {paymentMethod === "Credit" && (
                        <div>
                            <h4 className="payment-labels">
                                Credit Card Number
                            </h4>
                            <input
                                type="tel"
                                id="creditnum"
                                className="payment-inputs"
                            />
                            <h4 className="payment-labels">CVV</h4>
                            <input
                                type="num"
                                id="cvv"
                                className="payment-inputs"
                            />
                        </div>
                    )}
                </div>
                <div className="order-summary">
                    <h2>Booking Detail</h2>
                    <h3>Schedule</h3>
                    <p>Movie Title</p>
                    <h3>Title</h3>
                    <p>Date</p>
                    <h3>Date</h3>
                </div>
                <div className="payment">
                    <button onClick={handlePayment}>Pay Now</button>
                </div>
            </section>
        </div>
    );
}
