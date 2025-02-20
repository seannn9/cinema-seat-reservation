import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MovieDetails from "./pages/MovieDetails";
library.add(fas);

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/movie-details" element={<MovieDetails />} />
            </Routes>
        </>
    );
}

export default App;
