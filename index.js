require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database.js");

const port = process.env.PORT || 5704;

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5703";

const corsOptions = {
    origin: allowedOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("//feedback", require("./routes/feedback.router.js"));
app.use("//assignments", require("./routes/assignments.router.js"));
app.use("//chapters", require("./routes/chapters.router.js"));
app.use("//exercises", require("./routes/exercises.router.js"));
app.use("//users", require("./routes/users.router.js"));
app.get("/", (req, res) => {
    res.send(`Hello :D`);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
