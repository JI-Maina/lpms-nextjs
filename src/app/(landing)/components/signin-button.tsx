"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getUserRole, getUsername, resetAuthCookies } from "@/actions/actions";
import { Button } from "@/components/ui/button";

const SigninButton = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");

  const signOut = async () => {
    await resetAuthCookies();
    router.push("/");
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = await getUsername();
      const role = await getUserRole();

      setUsername(user as string);

      if (role === "owner") {
        setUserRole("/managers");
      } else if (role === "tenant") {
        setUserRole("/tenants");
      }
    };

    fetchUserRole();
  }, []);

  if (userRole) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={userRole}
          className="capitalize text-primary transition-colors hover:text-foreground"
        >
          {username}
        </Link>
        <Button variant="secondary" size="sm" onClick={signOut}>
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      asChild
      size="sm"
      className="text-muted-foreground hover:text-foreground"
    >
      <Link href="/auth/login">Log In</Link>
    </Button>
  );
};

export default SigninButton;
