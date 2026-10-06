import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { navigation } from "./constants";

type NavMobileProps = {
  onClose: () => void;
  links?: { name: string; href: string }[];
  ctaHref?: string;
  ctaLabel?: string;
};

const NavMobile = ({
  onClose,
  links = navigation,
  ctaHref = "/beta/apply",
  ctaLabel = "Apply Now →",
}: NavMobileProps) => {
  return (
    <nav className="flex h-full w-full flex-col border-r border-border bg-card shadow-2xl">
      <div className="flex justify-end p-4">
        <button type="button" onClick={onClose} aria-label="Close menu">
          <X className="h-6 w-6 text-foreground" />
        </button>
      </div>

      <ul className="flex flex-1 flex-col items-center justify-center gap-6">
        {links.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              onClick={onClose}
              className="text-xl font-medium text-foreground hover:text-primary"
            >
              {item.name}
            </Link>
          </li>
        ))}

        <Button asChild className="rounded-full shadow-[0_0_20px_rgba(39,174,96,0.25)]">
          <Link href={ctaHref} onClick={onClose}>
            {ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </ul>
    </nav>
  );
};

export default NavMobile;
