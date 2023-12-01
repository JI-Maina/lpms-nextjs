import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

import { menuItems } from "./LayoutData";

const MobileSidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const handleLinkClick = (index: number) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50">
        {/* header */}
        <Link
          to={"/"}
          className="flex items-center pb-4 border-b border-b-gray-700"
        >
          <img
            src="https://placeholder.co/40x40"
            alt="logo"
            className="h-10 w-10 rounded object-cover"
          />
          <span className="text-white ml-3 text-lg font-bold">LPMS</span>
        </Link>

        <ul className="mt-4">
          {/* menu */}
          {menuItems.map((menu, index) => (
            <li
              key={index}
              className={`mb-1 group ${
                menu.link === location.pathname && "active"
              }`}
            >
              <Link
                to={menu.subMenu ? "#" : menu.link}
                onClick={() => menu.subMenu && handleLinkClick(index)}
                className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white"
              >
                <span className="mr-3 text-lg">{menu.icon}</span>
                <span className="text-sm">{menu.path}</span>

                {menu.subMenu &&
                  (activeMenu === index ? (
                    <IoIosArrowDown className="ml-auto" />
                  ) : (
                    <IoIosArrowForward className="ml-auto" />
                  ))}
              </Link>

              {/* submenu */}
              {menu.subMenu && activeMenu === index && (
                <ul className="pl-7 mt-2">
                  {menu.subMenu.map((item, subIndex) => (
                    <li key={subIndex} className="mb-4">
                      <Link
                        to={item.link}
                        className="text-gray-300 text-sm hover:text-gray-100 before:contents-[''] before:w-1 before:rounded-full before:bg-gray-300 before:mr-3"
                      >
                        {item.path}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"></div>
    </>
  );
};

export default MobileSidebar;
