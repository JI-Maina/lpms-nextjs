import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { navigation } from "./constants";

type NavMobileProps = {
  onClose: () => void;
};

const NavMobile = ({ onClose }: NavMobileProps) => {
  return (
    <nav className="flex h-full w-full flex-col bg-card shadow-2xl">
      <div className="flex justify-end p-4">
        <button type="button" onClick={onClose} aria-label="Close menu">
          <X className="h-6 w-6 text-foreground" />
        </button>
      </div>

      <ul className="flex flex-1 flex-col items-center justify-center gap-6">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              onClick={onClose}
              className="text-xl font-medium capitalize text-foreground hover:text-primary"
            >
              {item.name}
            </Link>
          </li>
        ))}

        <Button asChild className="rounded-full">
          <Link href="/auth/register">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </ul>
    </nav>
  );
};

export default NavMobile;
