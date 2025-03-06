import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import "../styles/Payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PaymentComplete() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [customerName, setCustomerName] = useState("");
    const [gcashNum, setGcashNum] = useState();
    const [bankNum, setBankNum] = useState();
    const [bankRef, setBankRef] = useState();
    const [creditNum, setCreditNum] = useState();
    const [cvv, setCvv] = useState();

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

    useEffect(() => {
        setIsDisabled(paymentMethod === "" || customerName === "");
        if (paymentMethod === "Gcash") {
            setIsDisabled(!gcashNum);
        } else if (paymentMethod === "Bank") {
            setIsDisabled(!bankNum || !bankRef);
        } else {
            setIsDisabled(!creditNum || !cvv);
        }
    }, [
        paymentMethod,
        customerName,
        gcashNum,
        bankNum,
        bankRef,
        creditNum,
        cvv,
    ]);

    const handlePayment = () => {
        if (!isProcessing) {
            setIsProcessing(true);
            Axios.post("http://localhost:5001/processpayment", {
                movie: state.movie,
                location: state.location,
                date: state.date,
                time: state.time,
                seats: state.seats,
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
                            <FontAwesomeIcon icon="fa-solid fa-credit-card" />{" "}
                            Credit Card
                        </h4>
                        <h4
                            onClick={() => setPaymentMethod("Bank")}
                            className={paymentMethod === "Bank" ? "active" : ""}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-building-columns" />{" "}
                            Bank Transfer
                        </h4>
                        <h4
                            onClick={() => setPaymentMethod("Gcash")}
                            className={
                                paymentMethod === "Gcash" ? "active" : ""
                            }
                        >
                            <FontAwesomeIcon icon="fa-solid fa-wallet" />
                            {""} GCash
                        </h4>
                    </div>
                    {/* INPUTS */}
                    {!paymentMethod ? (
                        <h3>Select a Payment Method</h3>
                    ) : (
                        <div className="user-info">
                            <h4 className="payment-labels">Name</h4>
                            <input
                                type="text"
                                id="fullname"
                                className="payment-inputs"
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value.trimStart())
                                }
                            />
                        </div>
                    )}
                    {paymentMethod === "Gcash" && (
                        <div>
                            <h4 className="payment-labels">GCash Number</h4>
                            <input
                                type="tel"
                                id="gcashnum"
                                className="payment-inputs"
                                value={gcashNum}
                                onChange={(e) =>
                                    setGcashNum(e.target.value.trim())
                                }
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
                                value={bankNum}
                                onChange={(e) =>
                                    setBankNum(e.target.value.trim())
                                }
                            />
                            <h4 className="payment-labels">Reference Number</h4>
                            <input
                                type="tel"
                                id="refnum"
                                className="payment-inputs"
                                value={bankRef}
                                onChange={(e) =>
                                    setBankRef(e.target.value.trim())
                                }
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
                                value={creditNum}
                                onChange={(e) =>
                                    setCreditNum(e.target.value.trim())
                                }
                            />
                            <h4 className="payment-labels">CVV</h4>
                            <input
                                type="num"
                                id="cvv"
                                className="payment-inputs"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.trim())}
                            />
                        </div>
                    )}
                </div>
                <div className="order-summary">
                    <h2>Booking Detail</h2>
                    <h3>Schedule</h3>
                    <p>Movie Title</p>
                    <h3>{state.movie}</h3>
                    <p>Date</p>
                    <h3>{state.date}</h3>
                    <button
                        onClick={handlePayment}
                        disabled={isDisabled}
                        className={isDisabled ? "disabled" : ""}
                    >
                        Pay Now
                    </button>
                </div>
            </section>
        </div>
    );
}
