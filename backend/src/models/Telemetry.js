const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema(
    {
        timestamp: {
            type: Date,
            required: true
        },

        metadata: {
            deviceId: {
                type: String,
                required: true
            },

            deviceType: {
                type: String,
                default: "turbine"
            }
        },

        temperature: {
            type: Number
        },

        pressure: {
            type: Number
        },

        rpm: {
            type: Number
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model(
    "Telemetry",
    telemetrySchema,
    "telemetry"
);