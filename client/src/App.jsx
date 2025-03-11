import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MovieDetails from "./pages/MovieDetails";
import Payment from "./pages/Payment";
import Tickets from "./pages/Tickets";
import Admin from "./admin/Admin";
library.add(fas);

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* To handle user manually inputting the url without a movie id */}
                <Route
                    path="/movie-details"
                    element={<Navigate to="/dashboard" />}
                />
                <Route
                    path="/movie-details/:movieid"
                    element={<MovieDetails />}
                />
                <Route path="/payment" element={<Payment />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            <ToastContainer
                autoClose={3000}
                closeOnClick={true}
                theme="colored"
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
        </>
    );
}

export default App;
