const dns = require("dns");

// Use public DNS servers to resolve MongoDB Atlas SRV records
// Required because the local network DNS may refuse SRV queries.
dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const initializeTimeSeries = require("./config/initTimeSeries");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    await initializeTimeSeries();

    app.listen(PORT, () => {
        console.log(`NexusFlow server running on port ${PORT}`);
    });
};

startServer();