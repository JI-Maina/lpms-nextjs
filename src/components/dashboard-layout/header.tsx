"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import useScroll from "@/hooks/use-scroll";
import { ModeToggle } from "../theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

const Header = () => {
  // const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all bg-background border-b`
      )}
    >
      <div className="flex h-[55px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">LPMS</span>
          </Link>
        </div>

        <div className="hidden md:flex md:gap-2">
          <ModeToggle />

          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default Header;

const UserAvatar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>LP</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Log-Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
