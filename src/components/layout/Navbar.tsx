import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { LogOut } from "lucide-react";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Button } from "@components/ui/button";

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5">
      <button
        type="button"
        className="text-lg text-gray-600 md:hidden"
        onClick={toggleSidebar}
      >
        <FiMenu />
      </button>

      <ul className="ml-auto flex items-center">
        <li className="mr-3">
          <button
            type="button"
            className="text-gray-400 text-xl w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
          >
            <IoMdNotificationsOutline />
          </button>
        </li>

        <li>
          <Popover>
            <PopoverTrigger>
              <button type="button">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-32 flex flex-col items-start text-gray-400 text-sm">
              <div>
                <button className="hover:text-gray-500 hover:bg-gray-50 bg-gray-100 w-full text-left pl-1 rounded-sm mb-2">
                  Profile
                </button>
                <button className="hover:text-gray-500 bg-gray-100 hover:bg-gray-50 w-full text-left pl-1 rounded-sm">
                  Settings
                </button>
              </div>
              <Button className="text-xs mt-3" size="sm">
                <LogOut className="mr-2 h-4 w-4 text-xs" />
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
