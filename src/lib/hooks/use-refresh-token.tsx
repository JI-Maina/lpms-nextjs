"use client";

import { useSession } from "next-auth/react";

import axios from "../axios";

const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res: any = await axios.post("/auth/refresh_token/", {
      refreshToken: session?.refresh_token,
    });

    console.log("refresh called");
    if (session) session.access_token === res.data.access_token;
  };

  return refreshToken;
};

export default useRefreshToken;
