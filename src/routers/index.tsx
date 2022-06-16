import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthPage } from "../pages/auth";
import { DashboardPage } from "../pages/dashboard";
import { MainPage } from "../pages/main";
import { ErrorPage } from "../pages/error";

const routes = (isAuth: number | null): RouteObject[] => [
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: isAuth ? <Navigate to="/dashboard" /> : <MainPage />,
  },
  {
    path: "/login",
    element: isAuth ? <Navigate to="/dashboard" /> : <AuthPage />,
  },
  {
    path: "/register",
    element: isAuth ? <Navigate to="/dashboard" /> : <AuthPage />,
  },
  {
    path: "/dashboard",
    element: isAuth ? <DashboardPage /> : <Navigate to="/" />,
  },
];

export const AppRoutes = () => {
  const { user } = useAuth();
  const element = useRoutes(routes(user.id));

  return element;
};
