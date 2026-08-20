import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../pages/Dashboard/pages/DashboardPage";
import FlowBuilderPage from "../pages/Flow-builder/pages/FlowBuilderPage";
import TelemetryPage from "../pages/Telemetry/pages/TelemetryPage";
import AlertsPage from "../pages/Alerts/pages/AlertsPage";
import SettingsPage from "../pages/Settings/pages/SettingsPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "flows",
                element: <FlowBuilderPage />,
            },
            {
                path: "telemetry",
                element: <TelemetryPage />,
            },
            {
                path: "alerts",
                element: <AlertsPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            }
        ],
    },
]);

export default router;