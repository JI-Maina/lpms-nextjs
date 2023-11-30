import { FiMenu } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5">
      <button type="button" className="text-lg text-gray-600">
        <FiMenu />
      </button>

      <ul className="ml-auto flex items-center">
        <li className="mr-1">
          <button
            type="button"
            className="text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
          >
            <IoMdNotificationsOutline />
          </button>
        </li>

        <li>
          <button type="button">
            <img
              src="https://placeholder.co/32x32"
              alt=""
              className="w-8 h-8 rounded block object-cover align-middle"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
