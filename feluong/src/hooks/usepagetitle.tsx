import { useLocation } from "react-router-dom";
import { MenuConfig } from "../components/config/menuconfig";

export const usePageTitle = () => {
  const location = useLocation();

  const allMenus = Object.values(MenuConfig).flat();

  const currentMenu = allMenus.find(
    (item) => item.path === location.pathname
  );

  return currentMenu?.text || "Dashboard";
};