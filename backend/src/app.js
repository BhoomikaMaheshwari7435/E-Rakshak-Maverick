const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const smsRoutes = require("./routes/smsRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", healthRoutes);
app.use("/auth", authRoutes);
app.use("/api", healthRoutes);
app.use("/api", qrRoutes);
app.use("/api", smsRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to E-Rakshak Backend API 🚀"
    });
});

module.exports = app;
