import useTelemetry from "../../../hooks/useTelemetry";

const TelemetryPage = () => {
    const {
        telemetry,
        loading,
        error,
    } = useTelemetry();

    return (
        <section>
            <h1 className="text-3xl font-bold text-text">
                Telemetry
            </h1>

            <p className="mt-2 text-muted">
                Monitor incoming sensor data.
            </p>

            {loading && (
                <p className="mt-6 text-muted">
                    Loading telemetry data...
                </p>
            )}

            {error && (
                <p className="mt-6 text-red-500">
                    {error}
                </p>
            )}

            {!loading && !error && (
                <div className="mt-6">
                    <p className="text-muted">
                        Total records: {telemetry.length}
                    </p>
                </div>
            )}
        </section>
    );
};

export default TelemetryPage;