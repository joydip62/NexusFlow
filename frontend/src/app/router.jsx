import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import DashboardPage from "../pages/dashboard/pages/DashboardPage";
import FlowBuilderPage from "../pages/flow-builder/pages/FlowBuilderPage";
import TelemetryPage from "../pages/telemetry/pages/TelemetryPage";
import AlertsPage from "../pages/alerts/pages/AlertsPage";
import SettingsPage from "../pages/settings/pages/SettingsPage";

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