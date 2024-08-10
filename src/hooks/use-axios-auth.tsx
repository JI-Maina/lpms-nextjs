"use client";

import { useEffect, useState } from "react";

import { axiosAuth } from "../lib/axios";
import useRefreshToken from "./use-refresh-token";
import { getAccessToken } from "@/actions/actions";

const useAxiosAuth = () => {
  const [session, setSession] = useState("");
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const getToken = async () => {
      const session = await getAccessToken();
      setSession(session as string);
    };

    getToken();
  }, []);

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session}`;
        }

        return config;
      },

      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;

        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session}`;

          return axiosAuth(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
