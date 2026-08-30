"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { navigation } from "./constants";
import NavMobile from "./nav-mobile";
import SigninButton from "./signin-button";

const Header = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-16">
        <Link href="/" className="text-3xl font-bold text-foreground">
          LP<span className="text-primary">MS</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileNav(!mobileNav)}
          className="text-foreground md:hidden"
          aria-label={mobileNav ? "Close menu" : "Open menu"}
        >
          {mobileNav ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <SigninButton />
        </nav>

        <div
          className={`${
            mobileNav ? "left-0" : "-left-full"
          } fixed bottom-0 top-0 z-40 w-full max-w-xs transition-all md:hidden`}
        >
          <NavMobile onClose={() => setMobileNav(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
