const dns = require("dns");
const { startRuleEngine } = require("./services/ruleEngine");


dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

require("dotenv").config();

const http = require("http");

const app = require("./app");
const connectDB = require("./config/db");
const initializeTimeSeries = require("./config/initTimeSeries");
const { initializeWebSocket } = require("./websocket");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    await initializeTimeSeries();

    startRuleEngine();

    const server = http.createServer(app);

    initializeWebSocket(server);

    server.listen(PORT, () => {
        console.log(`NexusFlow server running on port ${PORT}`);
        console.log(`WebSocket server running on ws://localhost:${PORT}`);
    });
};

startServer();