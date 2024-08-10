"use client";

import { getAccessToken } from "@/actions/actions";
import axios from "../lib/axios";
import { useEffect, useState } from "react";

const useRefreshToken = () => {
  const [session, setSession] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const session = await getAccessToken();
      setSession(session as string);
    };

    getToken();
  }, []);

  const refreshToken = async () => {
    const res: any = await axios.post("/auth/refresh_token/", {
      refreshToken: session,
    });

    console.log("refresh called");
    if (session) session === res.data.access_token;
  };

  return refreshToken;
};

export default useRefreshToken;
