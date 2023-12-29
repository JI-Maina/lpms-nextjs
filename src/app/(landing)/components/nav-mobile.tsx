import Link from "next/link";
import { navigation } from "./constants";
import { ArrowRight } from "lucide-react";

const NavMobile = () => {
  return (
    <nav className="bg-white w-full h-full shadow-2xl">
      <ul className="text-center h-full flex flex-col justify-center items-center gap-y-6">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              className="text-xl text-black font-medium capitalize"
              href={item.href}
            >
              {item.name}
            </Link>
          </li>
        ))}

        <button className="ml-8 p-2 px-4 text-sm flex items-center bg-purple-600 rounded-sm hover:bg-purple-800">
          <Link href="/auth/register">Get Started</Link>
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </ul>
    </nav>
  );
};

export default NavMobile;
