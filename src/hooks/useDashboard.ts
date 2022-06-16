import { useContext } from "react";
import { DashboardContext } from "../providers/DashboardProvider";

export const useDashboard = () => {
  const {
    dashboards,
    dashboard,
    addUser,
    loginAccount,
    addAccount,
    editAccount,
    deleteAccount,
  } = useContext(DashboardContext);

  return {
    dashboards,
    dashboard,
    addUser,
    loginAccount,
    addAccount,
    editAccount,
    deleteAccount,
  };
};
