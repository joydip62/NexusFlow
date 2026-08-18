import { useEffect, useState } from "react";
import { getTelemetry } from "../services/telemetryService";

const useTelemetry = () => {
    const [telemetry, setTelemetry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTelemetry = async () => {
            try {
                const response = await getTelemetry();

                setTelemetry(response.data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch telemetry data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTelemetry();
    }, []);

    return {
        telemetry,
        loading,
        error,
    };
};

export default useTelemetry;