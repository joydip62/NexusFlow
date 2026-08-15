import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import FlowBuilderPage from "../features/flow-builder/pages/FlowBuilderPage";
import TelemetryPage from "../features/telemetry/pages/TelemetryPage";
import AlertsPage from "../features/alerts/pages/AlertsPage";
import SettingsPage from "../features/settings/pages/SettingsPage";

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