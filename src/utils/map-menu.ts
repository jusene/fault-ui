import { IBreadCrumb } from "@/base-ui/breadcrumb";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null;

export function mapMenusToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 先去加载默认所有routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("@/router/home", true, /\.ts$/);
  routeFiles.keys().forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require("@/router/home" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  // console.log(allRoutes);

  // 根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) {
          routes.push(route);
        }
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenu);
  return routes;
}

// 根据path获取menu
export function pathMapToMenu(
  MenuLst: any[],
  currentPath: string,
  breadcrumb?: IBreadCrumb[]
): any {
  for (const menu of MenuLst) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumb?.push({ name: menu.name, path: findMenu.url });
        breadcrumb?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

// 根据path获取面包屑
export function pathMapBreadcrumbs(MenuLst: any[], currentPath: string) {
  const breadcrumb: IBreadCrumb[] = [];
  pathMapToMenu(MenuLst, currentPath, breadcrumb);
  return breadcrumb;
}

export { firstMenu };
