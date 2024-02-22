import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// import axios from "axios";
// import { getServerSession } from "next-auth";

// import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// const BASE_URL = "http://127.0.0.1:8000";

// const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// export default axiosPrivate;

// export const getSession = async (req, res) => {
//   const session = await getServerSession(authOptions, { req });
//   return res.status(200).json({ session });
// };

// const createAxiosInstance = async () => {
//   //   const session = await getServerSession(authOptions);
//   const accessToken = await getSession();

//   const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (accessToken) {
//     axiosInstance.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${accessToken}`;
//   }

//   return axiosInstance;
// };

// export default createAxiosInstance;

// axiosPrivate.interceptors.request.use(async (config) => {
//   const session = await getServerSession(authOptions);
//   const accessToken = session?.access_token;

//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

// export default axiosPrivate;
