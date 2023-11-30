import { TiHomeOutline } from "react-icons/ti";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GrVmMaintenance } from "react-icons/gr";
import { MdOutlineMonetizationOn } from "react-icons/md";

export const menuItems = [
  { path: "Dashboard", link: "/dashboard", icon: <TiHomeOutline /> },
  {
    path: "Property",
    link: "/properties",
    icon: <HiOutlineBuildingOffice2 />,
    subMenu: [
      { path: "Maintenance", link: "/maintenance", icon: <GrVmMaintenance /> },
      { path: "Payment", link: "/payments", icon: <MdOutlineMonetizationOn /> },
    ],
  },
  { path: "Maintenance", link: "/maintenance", icon: <GrVmMaintenance /> },
  {
    path: "Payment",
    link: "/payments",
    icon: <MdOutlineMonetizationOn />,
    subMenu: [
      { path: "Maintenance", link: "/maintenance", icon: <GrVmMaintenance /> },
      { path: "Payment", link: "/payments", icon: <MdOutlineMonetizationOn /> },
    ],
  },
];
