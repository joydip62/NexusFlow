import { useLocation } from "react-router-dom";
import { sidebarMenu } from "../constants/sidebarMenu";

const usePageTitle = () => {
  const { pathname } = useLocation();

  const menu = sidebarMenu.find((item) => item.path === pathname);

  return menu?.label || "NexusFlow";
};

export default usePageTitle;