"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { navigation } from "./constants";
import NavMobile from "./nav-mobile";
import SigninButton from "./signin-button";

type HeaderProps = {
  links?: { name: string; href: string }[];
  ctaHref?: string;
  ctaLabel?: string;
  activeHref?: string;
};

const Header = ({
  links = navigation,
  ctaHref = "/beta/apply",
  ctaLabel = "Apply Now →",
  activeHref,
}: HeaderProps) => {
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {mobileNav && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}

      <header
        className={cn(
          "sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md transition-shadow",
          scrolled && "bg-background/95 shadow-lg shadow-black/40"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-6 py-3.5">
          <Link href="/" className="text-[1.7rem] font-extrabold tracking-tight text-foreground">
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
              {links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-foreground",
                      "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                      activeHref === item.href && "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-2 border-primary px-5 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>

            <SigninButton />
          </nav>
        </div>

        <div
          className={cn(
            "fixed bottom-0 top-0 z-50 w-full max-w-xs transition-all md:hidden",
            mobileNav ? "left-0" : "-left-full"
          )}
        >
          <NavMobile
            links={links}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
            onClose={() => setMobileNav(false)}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
