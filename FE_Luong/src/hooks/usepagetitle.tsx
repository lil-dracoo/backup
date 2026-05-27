import { useLocation } from "react-router-dom";
import { MenuConfig } from "../components/config/menuconfig";

const flattenMenus = (menus: any[]): any[] => {
  return menus.flatMap((item) => [
    item,

    ...(item.children
      ? flattenMenus(item.children)
      : []),
  ]);
};

export const usePageTitle = () => {
  const location = useLocation();

  // lấy tất cả menu cha + menu con
  const allMenus = flattenMenus(
    Object.values(MenuConfig).flat()
  );

  const currentMenu = allMenus.find(
    (item) =>
      item.path === location.pathname
  );

  return currentMenu?.text || "Dashboard";
};