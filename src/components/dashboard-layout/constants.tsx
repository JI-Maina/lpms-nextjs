import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Properties",
    path: "/home/properties",
    icon: <Icon icon="lucide:building" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "All", path: "/home/properties" },
      { title: "Web Design", path: "/projects/web-design" },
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Messages",
    path: "/home/messages",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: "Maintenances",
    path: "/home/maintenances",
    icon: <Icon icon="lucide:construction" width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/home/settings",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Payments",
    path: "/home/payments",
    icon: <Icon icon="lucide:bitcoin" width="24" height="24" />,
  },
];
