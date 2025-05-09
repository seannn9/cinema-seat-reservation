import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/Reports.css";

export default function Reports() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [usernames, setUsernames] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        const adminid = localStorage.getItem("adminid");
        if (!adminid) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:5001/getalltickets")
            .then((response) => {
                setTransactions(response.data);
                // Fetch usernames for all transactions
                response.data.forEach((transaction) => {
                    fetchUsername(transaction.userid);
                });
            })
            .catch((err) => console.error(err));
    }, []);

    const fetchUsername = async (userid) => {
        try {
            const response = await Axios.get(
                `http://localhost:5001/getusername/${userid}`
            );
            setUsernames((prev) => ({
                ...prev,
                [userid]: response.data[0].username,
            }));
        } catch (err) {
            console.error(err);
            setUsernames((prev) => ({
                ...prev,
                [userid]: "Unknown User",
            }));
        }
    };

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching

        const filtered = transactions.filter((transaction) => {
            const searchValue = value.toLowerCase();
            const username = (
                usernames[transaction.userid] || ""
            ).toLowerCase();
            const movie = (transaction.movie || "").toLowerCase();
            const location = (transaction.location || "").toLowerCase();
            const datetime = formatDateTime(
                transaction.purchase_date
            ).toLowerCase();
            const paymentMEthod = (
                transaction.payment_method || ""
            ).toLowerCase();

            return (
                username.includes(searchValue) ||
                movie.includes(searchValue) ||
                location.includes(searchValue) ||
                datetime.includes(searchValue) ||
                paymentMEthod.includes(searchValue)
            );
        });

        setFilteredTransactions(filtered);
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = (
        searchTerm ? filteredTransactions : transactions
    ).slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(
        (searchTerm ? filteredTransactions : transactions).length /
            recordsPerPage
    );

    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <h1 style={{ marginTop: 0 }}>
                    Transaction{" "}
                    <span style={{ color: "var(--primary-color)" }}>
                        Reports
                    </span>
                </h1>
                <div className="search">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search by customer, movie, location, date, or payment method..."
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                {currentRecords.length === 0 ? (
                    <div
                        className="no-results"
                        style={{
                            textAlign: "center",
                            padding: "20px",
                            color: "#666",
                        }}
                    >
                        No transactions found matching your search.
                    </div>
                ) : (
                    <div>
                        <div className="reports-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date & Time</th>
                                        <th>Customer</th>
                                        <th>Movie</th>
                                        <th>Location</th>
                                        <th>Seats</th>
                                        <th>Payment Method</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRecords.map((transaction) => (
                                        <tr key={transaction.ticketid}>
                                            <td>
                                                {formatDateTime(
                                                    transaction.purchase_date
                                                )}
                                            </td>
                                            <td>
                                                {usernames[
                                                    transaction.userid
                                                ] || "Loading..."}
                                            </td>
                                            <td>{transaction.movie}</td>
                                            <td>{transaction.location}</td>
                                            <td>
                                                {transaction.seats || "N/A"}
                                            </td>
                                            <td>
                                                {transaction.payment_method ||
                                                    "N/A"}
                                            </td>
                                            <td>₱{transaction.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination-controls">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
