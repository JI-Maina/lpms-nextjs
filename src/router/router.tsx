import Layout from "@components/layout/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: "/",
        element: <div>Home Page</div>,
      },
      {
        path: "/login",
        element: <div>Login Page</div>,
      },
      {
        path: "/register",
        element: <div>Register Page</div>,
      },
    ],
  },
  {
    path: "/home",
    element: <Layout />,
    children: [],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default router;
