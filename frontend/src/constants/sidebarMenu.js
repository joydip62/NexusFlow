import {
  FiGrid,
  FiGitBranch,
  FiActivity,
  FiBell,
  FiSettings,
} from "react-icons/fi";

export const sidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: FiGrid,
  },
  {
    id: "flows",
    label: "Flows",
    path: "/flows",
    icon: FiGitBranch,
  },
  {
    id: "telemetry",
    label: "Telemetry",
    path: "/telemetry",
    icon: FiActivity,
  },
  {
    id: "alerts",
    label: "Alerts",
    path: "/alerts",
    icon: FiBell,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];