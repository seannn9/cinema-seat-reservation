import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/Login.css";
import heroHalf from "../assets/hero-half.webp";

export default function Login() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState("Login");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        if (userid) {
            navigate("/dashboard");
        }
    }, []);

    const clearAll = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setErrorMessage("");
    };

    const register = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Please fill in both fields.");
            return;
        } else {
            const form = e.target.closest("form");
            if (!form.checkValidity()) {
                setErrorMessage("Please use a valid email address.");
                return;
            }
        }

        Axios.post("http://localhost:5001/register", {
            email: email,
            username: username,
            password: password,
        })
            .then((result) => {
                if (result.data === "Account creation successful!") {
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setErrorMessage(
                        "Account already exists. Please login instead."
                    );
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            });
    };

    const login = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!username || !password) {
            setErrorMessage("Please fill in both fields.");
            return;
        }

        Axios.post("http://localhost:5001/login", {
            username: username,
            password: password,
        })
            .then((result) => {
                if (result.data.message === "Login success") {
                    localStorage.setItem("userid", result.data.userid);
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setErrorMessage("Invalid password.");
                } else if (error.response && error.response.status === 404) {
                    setErrorMessage(
                        "Account doesn't exist. Please sign up first."
                    );
                } else {
                    console.log(error);
                    setErrorMessage("An error occurred. Please try again.");
                }
            });
    };

    const adminLogin = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!username || !password) {
            setErrorMessage("Please fill in both fields.");
            return;
        }

        Axios.post("http://localhost:5001/adminlogin", {
            username: username,
            password: password,
        })
            .then((result) => {
                if (result.data.message === "Admin Login Successful") {
                    localStorage.setItem("adminid", result.data.userid);
                    navigate("/admin");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setErrorMessage("Invalid password.");
                } else if (error.response && error.response.status === 404) {
                    setErrorMessage("Admin account doesn't exist.");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            });
    };

    return (
        <div className="login-container">
            <section className="login-section">
                <div className="form">
                    <div className="label">
                        <h1>
                            <Link to="/">FilmReserve</Link> {loginState}
                        </h1>
                        <p>
                            Welcome{" "}
                            {loginState === "Login" || loginState === "Register"
                                ? "user"
                                : "admin"}
                            ! Please enter your details.
                        </p>
                    </div>
                    <form>
                        {loginState === "Register" && (
                            <>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </>
                        )}

                        <label htmlFor="username">Username or Email</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username or email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {errorMessage && (
                            <p style={{ color: "var(--primary-color)" }}>
                                {errorMessage}
                            </p>
                        )}

                        {/* {loginState === "Login" ? (
                            <>
                                <button type="submit" onClick={login}>
                                    Sign In
                                </button>
                                <p>
                                    Don't have an account?{" "}
                                    <span
                                        onClick={() => {
                                            setLoginState("Register");
                                            clearAll();
                                        }}
                                    >
                                        Sign up for free!
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <button type="submit" onClick={register}>
                                    Sign Up
                                </button>
                                <p>
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => {
                                            setLoginState("Login");
                                            clearAll();
                                        }}
                                    >
                                        Login now!
                                    </span>
                                </p>
                            </>
                        )} */}
                        {loginState === "Login" && (
                            <>
                                <button type="submit" onClick={login}>
                                    Sign In
                                </button>
                                <p>
                                    Don't have an account?{" "}
                                    <span
                                        onClick={() => {
                                            setLoginState("Register");
                                            clearAll();
                                        }}
                                    >
                                        Sign up for free!
                                    </span>
                                </p>
                            </>
                        )}
                        {loginState === "Register" && (
                            <>
                                <button type="submit" onClick={register}>
                                    Sign Up
                                </button>
                                <p>
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => {
                                            setLoginState("Login");
                                            clearAll();
                                        }}
                                    >
                                        Login now!
                                    </span>
                                </p>
                            </>
                        )}
                        {loginState === "Admin" && (
                            <>
                                <button type="submit" onClick={adminLogin}>
                                    Admin Login
                                </button>
                                <p
                                    className="login-redir"
                                    onClick={() => setLoginState("Login")}
                                >
                                    Login As User
                                </p>
                            </>
                        )}
                        {loginState !== "Admin" && (
                            <p
                                className="login-redir"
                                onClick={() => setLoginState("Admin")}
                                style={{ margin: "0" }}
                            >
                                Login as Admin
                            </p>
                        )}
                    </form>
                </div>
            </section>
            <section className="heroimg-section">
                <img src={heroHalf} alt="hero image" />
            </section>
        </div>
    );
}
