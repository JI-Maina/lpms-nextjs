"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getUserRole, getUsername, resetAuthCookies } from "@/actions/actions";

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
      <div className="flex items-center gap-4 ml-10">
        <Link
          href={userRole}
          className="capitalize text-green-500 font-serif hover:border-[#A020F0] hover:text-white transition-all"
        >
          {username}
        </Link>

        <button
          onClick={signOut}
          className="ml-4 p-2 px-4 flex items-center text-sm bg-purple-600 rounded-sm hover:bg-purple-800"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4 ml-auto items-center">
      <button className="ml-8 p-2 px-4 flex items-center text-sm border rounded-sm hover:bg-purple-800">
        <Link href="/auth/login">Log In</Link>
      </button>

      <button className="ml-8 p-2 px-4 flex items-center text-sm bg-purple-600 rounded-sm hover:bg-purple-800">
        <Link href="/auth/register">Get Started</Link>
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

export default SigninButton;
