const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database.js");

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(
    "/chapter-assignments",
    require("./routes/chapterassignments.router.js")
);
app.use("/chapters", require("./routes/chapters.router.js"));
app.use("/exercises", require("./routes/exercises.router.js"));

app.get("/", (req, res) => {
    res.send("Ello :D");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
