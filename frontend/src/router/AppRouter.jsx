import React, { Profiler } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "../layout/Dashboard"
import Homelayout from "../layout/Homelayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import TaskLayout from "../layout/Dashboard";
import AuthLayout from '../layout/AuthLayout'
const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute/>,
      children: [
        {
          index: true,
          element: <AuthLayout />,
        },
      ],
    },
    {
      path: "/task",
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          element: <Dashboard/>,
        },
        {
          path:"/task/profile",
          element:<Homelayout/>
        }
    ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
