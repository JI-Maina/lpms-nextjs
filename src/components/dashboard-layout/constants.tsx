import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/home/managers",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Properties",
    path: "/home/managers/properties",
    icon: <Icon icon="lucide:building" width="24" height="24" />,
    // submenu: true,
    // subMenuItems: [
    //   { title: "All", path: "/home/properties" },
    //   { title: "Web Design", path: "/projects/web-design" },
    //   { title: "Graphic Design", path: "/projects/graphic-design" },
    // ],
  },
  {
    title: "Units",
    path: "/home/managers/units",
    icon: <Icon icon="lucide:container" width="24" height="24" />,
  },
  {
    title: "Users",
    path: "/home/managers/users",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Tenants", path: "/home/managers/users/tenants" },
      { title: "Caretakers", path: "/home/managers/users/caretakers" },
    ],
  },
  {
    title: "Finances",
    path: "/home/managers/finances",
    icon: <Icon icon="lucide:bitcoin" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      // { title: "Invoices", path: "/home/managers/finances/invoices" },
      { title: "Payments", path: "/home/managers/finances/payments" },
      { title: "Statements", path: "/home/managers/finances/statements" },
    ],
  },
  {
    title: "Maintenance",
    path: "/home/managers/maintenances",
    icon: <Icon icon="lucide:construction" width="24" height="24" />,
  },
  // {
  //   title: "Settings",
  //   path: "/home/settings",
  //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Account", path: "/settings/account" },
  //     { title: "Privacy", path: "/settings/privacy" },
  //   ],
  // },
];

export const TENANT_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/home/tenants",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  // {
  //   title: "Properties",
  //   path: "/home/managers/properties",
  //   icon: <Icon icon="lucide:building" width="24" height="24" />,
  //   // submenu: true,
  //   // subMenuItems: [
  //   //   { title: "All", path: "/home/properties" },
  //   //   { title: "Web Design", path: "/projects/web-design" },
  //   //   { title: "Graphic Design", path: "/projects/graphic-design" },
  //   // ],
  // },
  // {
  //   title: "Units",
  //   path: "/home/managers/units",
  //   icon: <Icon icon="lucide:container" width="24" height="24" />,
  // },
  // {
  //   title: "Users",
  //   path: "/home/managers/users",
  //   icon: <Icon icon="lucide:users" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Tenants", path: "/home/managers/users/tenants" },
  //     { title: "Caretakers", path: "/home/managers/users/caretakers" },
  //   ],
  // },
  // {
  //   title: "Finances",
  //   path: "/home/managers/finances",
  //   icon: <Icon icon="lucide:bitcoin" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Payments", path: "/home/managers/finances/payments" },
  //     { title: "Invoices", path: "/home/managers/finances/invoices" },
  //   ],
  // },
  // {
  //   title: "Maintenances",
  //   path: "/home/managers/maintenances",
  //   icon: <Icon icon="lucide:construction" width="24" height="24" />,
  // },
  // {
  //   title: "Settings",
  //   path: "/home/settings",
  //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Account", path: "/settings/account" },
  //     { title: "Privacy", path: "/settings/privacy" },
  //   ],
  // },
];
