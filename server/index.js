const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
require("dotenv").config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "filmreserve",
});

const sendConfirmationEmail = async (details) => {
    const qrCodeData = JSON.stringify({
        ticketid: details.ticketid,
        movie: details.movie,
        location: details.location,
        date: details.date,
        time: details.time,
        seats: details.seats,
    });

    const qrCodeImage = await QRCode.toDataURL(qrCodeData, {
        errorCorrectionLevel: "H",
        margin: 1,
        width: 200,
    });
    const emailTemplate = `
        <h1>Payment Confirmation</h1>
        <h2>Thank you for your purchase!</h2>
        <div style="margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h3>Booking Details:</h3>
            <p><strong>Movie:</strong> ${details.movie}</p>
            <p><strong>Location:</strong> ${details.location}</p>
            <p><strong>Date:</strong> ${details.date}</p>
            <p><strong>Time:</strong> ${details.time}</p>
            <p><strong>Seats:</strong> ${details.seats}</p>
            <p><strong>Total Amount:</strong> ₱${details.price}</p>
            <p><strong>Payment Method:</strong> ${details.payment_method}</p>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <h3>Your Ticket QR Code</h3>
            <img src="${qrCodeImage}" alt="Ticket QR Code" style="max-width: 200px;"/>
            <p style="color: #666; font-style: italic;">Show this QR code when entering the cinema</p>
        </div>
        <p>Please keep this email as your receipt. Show this email when entering the cinema.</p>
        <p>Enjoy your movie!</p>
    `;

    const mailOptions = {
        from: '"ReelTime" <seanulric9@gmail.com>',
        to: details.email,
        subject: "Movie Ticket Confirmation - ReelTime",
        html: emailTemplate,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

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

app.post("/processpayment", async (req, res) => {
    const {
        movie,
        location,
        date,
        time,
        seats,
        price,
        payment_method,
        userid,
    } = req.body;

    try {
        // Get user's email
        const userEmail = await new Promise((resolve, reject) => {
            db.query(
                "SELECT email FROM users WHERE userid = ?",
                [userid],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0]?.email);
                }
            );
        });

        if (!userEmail) {
            return res.status(400).json({
                message: "User email not found",
                success: false,
            });
        }

        // Insert ticket into database and get the ticket ID
        const ticketResult = await new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO tickets (movie, location, date, time, seats, price, payment_method, userid) VALUES (?,?,?,?,?,?,?,?)",
                [
                    movie,
                    location,
                    date,
                    time,
                    seats,
                    price,
                    payment_method,
                    userid,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        // Send confirmation email with QR code
        const emailSent = await sendConfirmationEmail({
            ticketId: ticketResult.insertId,
            movie,
            location,
            date,
            time,
            seats,
            price,
            payment_method,
            email: userEmail,
        });

        res.json({
            message: "Payment successful!",
            success: true,
            emailSent: emailSent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
});

app.post("/getusertickets", (req, res) => {
    const { userid } = req.body;

    db.query(
        "SELECT * FROM tickets WHERE userid = ?",
        [userid],
        (err, result) => {
            if (err) {
                return res.status(500).send("Server error.");
            } else {
                res.send(result);
            }
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
        "SELECT userid, password from users where username = ? OR email = ?",
        [username, username],
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

app.post("/adminlogin", (req, res) => {
    const { username, password } = req.body;
    db.query(
        "SELECT * from admin where adminname = ?",
        [username],
        async (err, results) => {
            if (err) {
                return res.status(500).send("Server error.");
            }
            if (results.length === 0) {
                return res.status(404).send("Admin account doesn't exist.");
            }

            if (password === results[0].adminpassword) {
                res.json({
                    message: "Admin Login Successful",
                    adminid: results[0].adminid,
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

// Add Movie
app.post("/addmovie", (req, res) => {
    const { title, poster, release_date, duration, genre, price } = req.body;

    db.query(
        "INSERT INTO movies (title, poster, release_date, duration, genre, price) VALUES (?,?,?,?,?,?)",
        [title, poster, release_date, duration, genre, price],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error adding movie");
            }
            res.send("Movie added successfully!");
        }
    );
});

// Update Movie
app.post("/updatemovie/:movieid", (req, res) => {
    const movieid = req.params.movieid;
    const { title, poster, release_date, duration, genre, price } = req.body;

    db.query(
        "UPDATE movies SET title=?, poster=?, release_date=?, duration=?, genre=?, price=? WHERE movieid=?",
        [title, poster, release_date, duration, genre, price, movieid],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error updating movie");
            }
            res.send("Movie updated successfully!");
        }
    );
});

// Delete Movie
app.post("/deletemovie/:movieid", (req, res) => {
    const movieid = req.params.movieid;

    db.query("DELETE FROM movies WHERE movieid=?", [movieid], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error deleting movie");
        }
        res.send("Movie deleted successfully!");
    });
});

app.post("/getreservedseats", (req, res) => {
    const { movieid, location, date, time } = req.body;

    db.query(
        "SELECT seats FROM tickets WHERE movie = (SELECT title FROM movies WHERE movieid = ?) AND location = ? AND date = ? AND time = ?",
        [movieid, location, date, time],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Server error.");
            }

            // Remove spaces and commas then combine all reserved seats into a single array
            const reservedSeats = result.reduce((acc, ticket) => {
                return [...acc, ...ticket.seats.split(", ")];
            }, []);

            res.send(reservedSeats);
        }
    );
});

app.post("/getalltickets", (req, res) => {
    db.query("SELECT * FROM tickets", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Server error.");
        } else {
            res.send(result);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
