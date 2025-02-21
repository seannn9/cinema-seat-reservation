const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "filmreserve",
});

app.post("/getshowingmovies", (req, res) => {
    db.query("SELECT * FROM movies", (err, result) => {
        if (err) {
            return res.status(500).send("Server error.");
        } else {
            res.send(result);
        }
    });
});

app.post("/getmovie/:movieid", (req, res) => {
    const movieid = req.params.movieid;

    db.query(
        "SELECT * FROM movies WHERE movieid = ?",
        [movieid],
        (err, result) => {
            if (err) {
                return res.status(500).send("Server error.");
            }

            if (result.length === 0) {
                return res.status(404).send("Movie not found.");
            }

            res.send(result[0]);
        }
    );
});

// USER ENDPOINTS

app.post("/register", (req, res) => {
    const { email, username, password } = req.body;
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                return res.status(500).send("Server error.");
            }
            if (results.length > 0) {
                return res.status(400).send("Account already exists.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users (email, username, password) VALUES (?,?,?)",
                [email, username, hashedPassword],
                (err, results) => {
                    if (err) {
                        return res.status(500).send("Error creating account");
                    } else {
                        res.send("Account creation successful!");
                    }
                }
            );
        }
    );
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query(
        "SELECT userid, password from users where username = ?",
        [username],
        async (err, results) => {
            if (err) {
                return res.status(500).send("Server error.");
            }
            if (results.length === 0) {
                return res
                    .status(404)
                    .send("Account doesn't exist. Please sign up first.");
            }

            const matchPassword = await bcrypt.compare(
                password,
                results[0].password
            );

            if (matchPassword) {
                res.json({
                    message: "Login success",
                    userid: results[0].userid,
                });
            } else {
                res.status(400).send("Invalid password");
            }
        }
    );
});

app.get("/getusername/:userid", (req, res) => {
    const { userid } = req.params;
    db.query(
        "SELECT username from users where userid = ?",
        [userid],
        (err, results) => {
            if (err) {
                return res.status(500).send("Server error.");
            } else if (results.length === 0) {
                return res.status(404).send("User doesn't exist");
            } else {
                res.send(results);
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
