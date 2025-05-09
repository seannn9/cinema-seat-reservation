import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/Reports.css";

export default function Reports() {
    const [transactions, setTransactions] = useState([]);
    const [usernames, setUsernames] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

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

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = transactions.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );
    const totalPages = Math.ceil(transactions.length / recordsPerPage);

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
                                        {usernames[transaction.userid] ||
                                            "Loading..."}
                                    </td>
                                    <td>{transaction.movie}</td>
                                    <td>{transaction.location}</td>
                                    <td>{transaction.seats || "N/A"}</td>
                                    <td>
                                        {transaction.payment_method || "N/A"}
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
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
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
        </div>
    );
}
