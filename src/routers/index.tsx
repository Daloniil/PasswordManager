import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { DashboardPage } from "../pages/Dashboard";
import { LoginPage } from "../pages/Login";
import { MainPage } from "../pages/Main";
import { ErrorPage } from "../pages/NotFound";
import { RegisterPage } from "../pages/Register";

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
    element: isAuth ? <Navigate to="/dashboard" /> : <LoginPage />,
  },
  {
    path: "/register",
    element: isAuth ? <Navigate to="/dashboard" /> : <RegisterPage />,
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
