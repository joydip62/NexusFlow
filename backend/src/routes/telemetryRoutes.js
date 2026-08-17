const express = require("express");

const {
    createTelemetry, createBulkTelemetry
} = require("../controllers/telemetryController");

const router = express.Router();

// Single telemetry 
router.post("/", createTelemetry);

// Bulk telemetry
router.post("/bulk", createBulkTelemetry);

module.exports = router;