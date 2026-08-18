const express = require("express");

const {
    createTelemetry, getTelemetry, createBulkTelemetry
} = require("../controllers/telemetryController");

const router = express.Router();

// Get telemetry
router.get("/", getTelemetry);

// Single telemetry 
router.post("/", createTelemetry);

// Bulk telemetry
router.post("/bulk", createBulkTelemetry);

module.exports = router;