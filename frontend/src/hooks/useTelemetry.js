import { useEffect, useState } from "react";
import { getTelemetry } from "../services/telemetryService";

const useTelemetry = () => {
  const [telemetry, setTelemetry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTelemetry = async () => {
    setLoading(true);

    try {
      const response = await getTelemetry();

      setTelemetry(response.data || []);
      setError("");
    } catch (error) {
      console.error("Failed to fetch telemetry:", error);

      setError(
        error.response?.data?.message ||
        "Failed to fetch telemetry data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  return {
    telemetry,
    loading,
    error,
    refetch: fetchTelemetry,
  };
};

export default useTelemetry;