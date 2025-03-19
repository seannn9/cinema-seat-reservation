import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import "../styles/Payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export default function Payment() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [customerName, setCustomerName] = useState("");
    const [gcashNum, setGcashNum] = useState("");
    const [bankNum, setBankNum] = useState("");
    const [creditNum, setCreditNum] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAccountName, setBankAccountName] = useState("");
    const [gcashAccountName, setGcashAccountName] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        const adminid = localStorage.getItem("adminid");
        if (userid) {
            console.log("Logged in");
        } else if (adminid) {
            console.log("Logged in as admin");
            navigate("/dashboard");
            toast.warn(
                "You are logged in as admin. Log in as user first before paying",
                { autoClose: 5000 }
            );
        } else {
            localStorage.setItem("loginBeforePay", "true");
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
        let isFormValid = customerName.trim() !== "";

        if (paymentMethod === "Credit") {
            isFormValid =
                isFormValid &&
                creditNum.replace(/\s/g, "").length === 16 &&
                expiryDate.length === 5 &&
                cvv.length === 3;
        } else if (paymentMethod === "Bank") {
            isFormValid =
                isFormValid &&
                bankName !== "" &&
                bankNum.length >= 10 &&
                bankAccountName.trim() !== "";
        } else if (paymentMethod === "Gcash") {
            isFormValid =
                isFormValid &&
                gcashNum.length === 11 &&
                gcashAccountName.trim() !== "";
        } else {
            isFormValid = false;
        }

        setIsDisabled(!isFormValid);
    }, [
        paymentMethod,
        customerName,
        creditNum,
        expiryDate,
        cvv,
        bankName,
        bankNum,
        bankAccountName,
        gcashNum,
        gcashAccountName,
    ]);

    useEffect(() => {
        if (state) {
            setMovieDetails({
                movie: state.movie,
                location: state.location,
                date: state.date,
                time: state.time,
                seats: state.seats,
                price: state.price,
            });
        }
    }, [state]);

    const handlePayment = (e) => {
        e.preventDefault();
        if (!isProcessing && movieDetails) {
            setIsProcessing(true);
            Axios.post("http://localhost:5001/processpayment", {
                ...movieDetails,
                payment_method: paymentMethod,
                userid: localStorage.getItem("userid"),
            })
                .then((response) => {
                    if (response.data === "Payment successful!") {
                        setPaymentStatus("Payment successful!");
                        console.log(paymentStatus);
                        navigate("/tickets");
                    } else {
                        setPaymentStatus("Payment failed!");
                        console.log(paymentStatus);
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
                <div className="payment-method">
                    <h2>Select Payment Method</h2>
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
                            <FontAwesomeIcon icon="fa-solid fa-wallet" /> GCash
                        </h4>
                    </div>

                    {/* Common input for all payment methods */}
                    <div className="user-info">
                        <h4 className="payment-labels">Name on Card/Account</h4>
                        <input
                            type="text"
                            id="fullname"
                            className="payment-inputs"
                            placeholder="Enter the name as it appears on your card/account"
                            value={customerName}
                            onChange={(e) =>
                                setCustomerName(e.target.value.trimStart())
                            }
                        />
                    </div>

                    {/* Credit Card specific inputs */}
                    {paymentMethod === "Credit" && (
                        <div className="payment-fields">
                            <div className="field">
                                <h4 className="payment-labels">Card Number</h4>
                                <input
                                    type="text"
                                    id="creditnum"
                                    className="payment-inputs"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    value={creditNum}
                                    onChange={(e) => {
                                        // Format card number with spaces every 4 digits
                                        const value = e.target.value
                                            .replace(/\s/g, "")
                                            .replace(/(\d{4})/g, "$1 ")
                                            .trim();
                                        setCreditNum(value);
                                    }}
                                />
                            </div>
                            <div className="field-group">
                                <div className="field">
                                    <h4 className="payment-labels">
                                        Expiry Date
                                    </h4>
                                    <input
                                        type="text"
                                        id="expiry"
                                        className="payment-inputs"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        value={expiryDate}
                                        onChange={(e) =>
                                            setExpiryDate(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="field">
                                    <h4 className="payment-labels">CVV</h4>
                                    <input
                                        type="password"
                                        id="cvv"
                                        className="payment-inputs"
                                        placeholder="123"
                                        maxLength="3"
                                        value={cvv}
                                        onChange={(e) =>
                                            setCvv(
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                )
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bank Transfer specific inputs */}
                    {paymentMethod === "Bank" && (
                        <div className="payment-fields">
                            <div className="field">
                                <h4 className="payment-labels">Bank Name</h4>
                                <select
                                    id="bankName"
                                    className="payment-inputs"
                                    value={bankName}
                                    onChange={(e) =>
                                        setBankName(e.target.value)
                                    }
                                >
                                    <option value="">Select your bank</option>
                                    <option value="BDO">BDO</option>
                                    <option value="BPI">BPI</option>
                                    <option value="Metrobank">Metrobank</option>
                                    <option value="UnionBank">UnionBank</option>
                                    <option value="SecurityBank">
                                        Security Bank
                                    </option>
                                </select>
                            </div>
                            <div className="field">
                                <h4 className="payment-labels">
                                    Account Number
                                </h4>
                                <input
                                    type="text"
                                    id="banknum"
                                    className="payment-inputs"
                                    placeholder="Enter your account number"
                                    maxLength="16"
                                    value={bankNum}
                                    onChange={(e) =>
                                        setBankNum(
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                />
                            </div>
                            <div className="field">
                                <h4 className="payment-labels">Account Name</h4>
                                <input
                                    type="text"
                                    id="bankAccountName"
                                    className="payment-inputs"
                                    placeholder="Enter account holder name"
                                    value={bankAccountName}
                                    onChange={(e) =>
                                        setBankAccountName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    )}

                    {/* GCash specific inputs */}
                    {paymentMethod === "Gcash" && (
                        <div className="payment-fields">
                            <div className="field">
                                <h4 className="payment-labels">GCash Number</h4>
                                <input
                                    type="tel"
                                    id="gcashnum"
                                    className="payment-inputs"
                                    placeholder="09XX XXX XXXX"
                                    maxLength="11"
                                    value={gcashNum}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(
                                            /\D/g,
                                            ""
                                        );
                                        setGcashNum(value);
                                    }}
                                />
                            </div>
                            <div className="field">
                                <h4 className="payment-labels">
                                    GCash Account Name
                                </h4>
                                <input
                                    type="text"
                                    id="gcashName"
                                    className="payment-inputs"
                                    placeholder="Enter GCash account name"
                                    value={gcashAccountName}
                                    onChange={(e) =>
                                        setGcashAccountName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="order-summary">
                    <h2>Booking Details</h2>
                    <div className="summary-details">
                        <div className="summary-item">
                            <span className="label">Movie Title</span>
                            <span className="value">{movieDetails?.movie}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />{" "}
                                Location
                            </span>
                            <span className="value">
                                {movieDetails?.location}
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="label">
                                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />{" "}
                                Date
                            </span>
                            <span className="value">{movieDetails?.date}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">
                                <FontAwesomeIcon icon="fa-solid fa-clock" />{" "}
                                Time
                            </span>
                            <span className="value">{movieDetails?.time}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">
                                <FontAwesomeIcon icon="fa-solid fa-couch" />{" "}
                                Seats
                            </span>
                            <span className="value">{movieDetails?.seats}</span>
                        </div>
                        <div className="summary-item total">
                            <span className="label">
                                <FontAwesomeIcon icon="fa-solid fa-peso-sign" />{" "}
                                Total Price
                            </span>
                            <span className="value">
                                ₱{movieDetails?.price}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowPaymentModal(true)}
                        disabled={isDisabled}
                        className={isDisabled ? "disabled" : ""}
                    >
                        {isProcessing ? "Processing..." : "Pay Now"}
                    </button>
                </div>
            </section>
            {showPaymentModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Payment</h2>
                        <p
                            style={{
                                fontWeight: "bold",
                                color: "var(--primary-color)",
                            }}
                        >
                            Total: ₱{movieDetails?.price}
                        </p>
                        <form onSubmit={handlePayment}>
                            <div className="modal-buttons">
                                <button type="submit">Pay Now</button>
                                <button
                                    type="button"
                                    onClick={() => setShowPaymentModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
