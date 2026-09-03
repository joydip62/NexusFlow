const { Subject } = require("rxjs");
const { scan } = require("rxjs/operators");

const { broadcast } = require("../websocket");

const telemetry$ = new Subject();

const deviceWindows = new Map();

const processMovingAverage = (telemetry, config) => {
    const deviceId = telemetry.metadata?.deviceId;

    const field = config?.field || "temperature";
    const windowSize = Number(config?.window) || 5;

    const value = Number(telemetry[field]);

    if (!deviceId || Number.isNaN(value)) {
        return null;
    }

    if (!deviceWindows.has(deviceId)) {
        deviceWindows.set(deviceId, []);
    }

    const values = deviceWindows.get(deviceId);

    values.push(value);

    if (values.length > windowSize) {
        values.shift();
    }

    const average =
        values.reduce((sum, current) => sum + current, 0) /
        values.length;

    return {
        deviceId,
        field,
        windowSize,
        values: [...values],
        average
    };
};

const evaluateRule = (result) => {
    if (!result) {
        return null;
    }

    // Default anomaly threshold for Week 3
    const threshold = 80;

    const triggered = result.average >= threshold;

    return {
        triggered,
        threshold,
        average: result.average
    };
};

const startRuleEngine = () => {
    telemetry$
        .pipe(
            scan(
                (state, telemetry) => {
                    const movingAverageConfig = {
                        window: 5,
                        field: "temperature"
                    };

                    const movingAverage =
                        processMovingAverage(
                            telemetry,
                            movingAverageConfig
                        );

                    const ruleResult =
                        evaluateRule(movingAverage);

                    return {
                        telemetry,
                        movingAverage,
                        ruleResult
                    };
                },
                {}
            )
        )
        .subscribe((result) => {
            broadcast({
                type: "rule-result",
                data: result
            });

            if (result.ruleResult?.triggered) {
                broadcast({
                    type: "alert",
                    data: {
                        deviceId:
                            result.telemetry.metadata?.deviceId,

                        field:
                            result.movingAverage.field,

                        average:
                            result.ruleResult.average,

                        threshold:
                            result.ruleResult.threshold,

                        message:
                            "Temperature threshold exceeded"
                    }
                });
            }
        });

    console.log("NexusFlow Rule Engine started");
};

const pushTelemetry = (telemetry) => {
    telemetry$.next(telemetry);
};

module.exports = {
    startRuleEngine,
    pushTelemetry
};