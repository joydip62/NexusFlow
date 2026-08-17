const Telemetry = require("../models/Telemetry");

const createTelemetry = async (req, res) => {
    try {
        const {
            deviceId,
            deviceType,
            timestamp,
            temperature,
            pressure,
            rpm
        } = req.body;

        // Validate required field
        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: "deviceId is required"
            });
        }

        const telemetry = await Telemetry.create({
            timestamp: timestamp || new Date(),

            metadata: {
                deviceId,
                deviceType: deviceType || "turbine"
            },

            temperature,
            pressure,
            rpm
        });

        return res.status(201).json({
            success: true,
            message: "Telemetry stored successfully",
            data: telemetry
        });

    } catch (error) {
        console.error("Telemetry creation failed:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to store telemetry",
            error: error.message
        });
    }
};

module.exports = {
    createTelemetry
};