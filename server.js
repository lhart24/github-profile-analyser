const express = require("express");
const cors = require("cors");
const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(cors()); // allow requests from React

app.use(express.json());
app.use("/api/github", githubRoutes);

app.get("/ping", (req, res) => res.send("pong"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});