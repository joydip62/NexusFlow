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
const getTelemetry = async (req, res) => {
    try {
        const telemetry = await Telemetry.find()
            .sort({ timestamp: -1 });

        return res.status(200).json({
            success: true,
            count: telemetry.length,
            data: telemetry
        });

    } catch (error) {
        console.error("Failed to fetch telemetry:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch telemetry",
            error: error.message
        });
    }
};

const createBulkTelemetry = async (req, res) => {
    try {
        const telemetryData = req.body;

        // Request body must be an array
        if (!Array.isArray(telemetryData)) {
            return res.status(400).json({
                success: false,
                message: "Request body must be an array"
            });
        }

        // Empty array is not allowed
        if (telemetryData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Telemetry data cannot be empty"
            });
        }

        // Prepare telemetry documents
        const documents = telemetryData.map((item) => ({
            timestamp: item.timestamp || new Date(),

            metadata: {
                deviceId: item.deviceId,
                deviceType: item.deviceType || "turbine"
            },

            temperature: item.temperature,
            pressure: item.pressure,
            rpm: item.rpm
        }));

        // Validate deviceId
        const invalidDevice = documents.find(
            (item) => !item.metadata.deviceId
        );

        if (invalidDevice) {
            return res.status(400).json({
                success: false,
                message: "deviceId is required for every telemetry record"
            });
        }

        // Insert all records at once
        const telemetry = await Telemetry.insertMany(documents);

        return res.status(201).json({
            success: true,
            message: `${telemetry.length} telemetry records stored successfully`,
            count: telemetry.length
        });

    } catch (error) {
        console.error("Bulk telemetry creation failed:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to store bulk telemetry",
            error: error.message
        });
    }
};


module.exports = {
    createTelemetry, 
    getTelemetry,
    createBulkTelemetry
};