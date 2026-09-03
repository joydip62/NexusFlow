const { WebSocketServer } = require("ws");

let wss;

const initializeWebSocket = (server) => {
    wss = new WebSocketServer({
        server,
        path: "/ws"
    });

    wss.on("connection", (socket) => {
        console.log("WebSocket client connected");

        socket.send(
            JSON.stringify({
                type: "connection",
                success: true,
                message: "Connected to NexusFlow WebSocket"
            })
        );

        socket.on("close", () => {
            console.log("WebSocket client disconnected");
        });

        socket.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    });

    console.log("WebSocket initialized");
};

const broadcast = (data) => {
    if (!wss) {
        return;
    }

    const message = JSON.stringify(data);

    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });
};

module.exports = {
    initializeWebSocket,
    broadcast
};