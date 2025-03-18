import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Admin() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        poster: "",
        release_date: "",
        duration: "",
        genre: "",
        price: "",
    });

    useEffect(() => {
        const adminid = localStorage.getItem("adminid");
        if (!adminid) {
            navigate("/login");
        }
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        Axios.post("http://localhost:5001/getshowingmovies")
            .then((response) => {
                setMovies(response.data);
            })
            .catch((err) => console.error(err));
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddMovie = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:5001/addmovie", formData)
            .then(() => {
                setShowAddModal(false);
                fetchMovies();
                setFormData({
                    title: "",
                    poster: "",
                    release_date: "",
                    duration: "",
                    genre: "",
                    price: "",
                });
            })
            .catch((err) => console.error(err));
    };

    const handleEditMovie = (e) => {
        e.preventDefault();
        Axios.post(
            `http://localhost:5001/updatemovie/${selectedMovie.movieid}`,
            formData
        )
            .then(() => {
                setShowEditModal(false);
                fetchMovies();
                setFormData({
                    title: "",
                    poster: "",
                    release_date: "",
                    duration: "",
                    genre: "",
                    price: "",
                });
            })
            .catch((err) => console.error(err));
    };

    const handleDeleteMovie = (e) => {
        e.preventDefault();
        Axios.post(`http://localhost:5001/deletemovie/${selectedMovie.movieid}`)
            .then(() => {
                fetchMovies();
            })
            .then(() => {
                setShowDeleteModal(false);
                fetchMovies();
            })
            .catch((err) => console.error(err));
    };

    const openEditModal = (movie) => {
        setSelectedMovie(movie);
        setFormData(movie);
        setShowEditModal(true);
    };

    const openDeleteModal = (movie) => {
        setSelectedMovie(movie);
        setShowDeleteModal(true);
    };

    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <h1 style={{ marginTop: "0" }}>Manage Movies</h1>
                <button
                    className="add-btn"
                    onClick={() => setShowAddModal(true)}
                >
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Movie
                </button>

                <div className="movies-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Release Date</th>
                                <th>Duration</th>
                                <th>Genre</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => (
                                <tr key={movie.movieid}>
                                    <td>{movie.title}</td>
                                    <td>{movie.release_date}</td>
                                    <td>{movie.duration}</td>
                                    <td>{movie.genre}</td>
                                    <td>₱{movie.price}</td>
                                    <td>
                                        <button
                                            onClick={() => openEditModal(movie)}
                                        >
                                            <FontAwesomeIcon icon="fa-solid fa-edit" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                openDeleteModal(movie)
                                            }
                                        >
                                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Movie Modal */}
                {showAddModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Add New Movie</h2>
                            <form onSubmit={handleAddMovie}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Movie Title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="poster"
                                    placeholder="Poster URL"
                                    value={formData.poster}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="release_date"
                                    placeholder="Release Date"
                                    value={formData.release_date}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="Duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="genre"
                                    placeholder="Genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="modal-buttons">
                                    <button type="submit">Add Movie</button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Movie Modal */}
                {showEditModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit Movie</h2>
                            <form onSubmit={handleEditMovie}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Movie Title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="poster"
                                    placeholder="Poster URL"
                                    value={formData.poster}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="release_date"
                                    placeholder="Release Date"
                                    value={formData.release_date}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="Duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="genre"
                                    placeholder="Genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="modal-buttons">
                                    <button>Update Movie</button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Delete Movie Confirmation Modal */}
                {showDeleteModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>
                                Are you sure you want to delete this movie?{" "}
                                <span
                                    style={{
                                        fontStyle: "italic",
                                        color: "var(--primary-color)",
                                    }}
                                >
                                    {selectedMovie.title}
                                </span>
                            </h2>
                            <form onSubmit={handleDeleteMovie}>
                                <div className="modal-buttons">
                                    <button type="submit">Delete Movie</button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
