const mongoose = require("mongoose");

const initializeTimeSeries = async () => {
    try {
        const db = mongoose.connection.db;

        const collections = await db
            .listCollections({
                name: "telemetry"
            })
            .toArray();

        if (collections.length > 0) {
            console.log("Telemetry collection already exists");
            return;
        }

        await db.createCollection("telemetry", {
            timeseries: {
                timeField: "timestamp",
                metaField: "metadata",
                granularity: "seconds"
            }
        });

        console.log("Telemetry time-series collection created");

    } catch (error) {
        console.error(
            "Failed to create telemetry collection:",
            error.message
        );

        throw error;
    }
};

module.exports = initializeTimeSeries;