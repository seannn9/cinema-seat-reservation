import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

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

    const clearFormData = () => {
        setFormData({
            title: "",
            poster: "",
            release_date: "",
            duration: "",
            genre: "",
            price: "",
        });
    };

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
                clearFormData();
                toast.success("Successfully added movie");
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
                clearFormData();
                toast.success("Successfully updated movie");
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
                toast.success("Successfully deleted movie");
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
                <h1 style={{ marginTop: "0" }}>
                    Manage{" "}
                    <span style={{ color: "var(--primary-color)" }}>
                        Movies
                    </span>
                </h1>
                <button
                    className="add-btn"
                    onClick={() => {
                        setShowAddModal(true);
                        clearFormData();
                    }}
                >
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Movie
                </button>
                {movies.length === 0 && (
                    <h2 style={{ fontStyle: "italic", color: "#979494" }}>
                        No Movies Yet. Start Adding Some.
                    </h2>
                )}
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
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="title"
                                        id="add-title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Movie Title"
                                        required
                                    />
                                    <label htmlFor="add-title">
                                        Movie Title
                                    </label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="poster"
                                        id="add-poster"
                                        value={formData.poster}
                                        onChange={handleInputChange}
                                        placeholder="Poster URL"
                                        required
                                    />
                                    <label htmlFor="add-poster">
                                        Poster URL
                                    </label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="release_date"
                                        id="add-release_date"
                                        value={formData.release_date}
                                        onChange={handleInputChange}
                                        placeholder="Release Date"
                                        required
                                    />
                                    <label htmlFor="add-release_date">
                                        Release Date
                                    </label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="duration"
                                        id="add-duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="Duration"
                                        required
                                    />
                                    <label htmlFor="add-duration">
                                        Duration
                                    </label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="genre"
                                        id="add-genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        placeholder="Genre"
                                        required
                                    />
                                    <label htmlFor="add-genre">Genre</label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="number"
                                        name="price"
                                        id="add-price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Price"
                                        required
                                    />
                                    <label htmlFor="add-price">Price</label>
                                </div>
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
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="title"
                                        id="edit-title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Movie Title"
                                        required
                                    />
                                    <label htmlFor="edit-title">
                                        Movie Title
                                    </label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="poster"
                                        id="edit-poster"
                                        value={formData.poster}
                                        onChange={handleInputChange}
                                        placeholder="Poster URL"
                                        required
                                    />
                                    <label htmlFor="edit-poster">
                                        Poster URL
                                    </label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="release_date"
                                        id="edit-release_date"
                                        value={formData.release_date}
                                        onChange={handleInputChange}
                                        placeholder="Release Date"
                                        required
                                    />
                                    <label htmlFor="edit-release_date">
                                        Release Date
                                    </label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="duration"
                                        id="edit-duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="Duration"
                                        required
                                    />
                                    <label htmlFor="edit-duration">
                                        Duration
                                    </label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="genre"
                                        id="edit-genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        placeholder="Genre"
                                        required
                                    />
                                    <label htmlFor="edit-genre">Genre</label>
                                </div>
                                <div className="form-field">
                                    <input
                                        type="number"
                                        name="price"
                                        id="edit-price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Price"
                                        required
                                    />
                                    <label htmlFor="edit-price">Price</label>
                                </div>
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
