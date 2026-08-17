const express = require("express");
const cors = require("cors");

const app = express();

const telemetryRoutes = require("./routes/telemetryRoutes");

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "NexusFlow backend is running"
    });
});
// app.use("*", (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: "Route not found"
//     });
// });
app.use("/api/telemetry", telemetryRoutes);

module.exports = app;