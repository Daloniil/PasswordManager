import React, { ReactNode, useCallback, useState } from "react";
import { ContextKey } from "../services/localKey";
import { LocalStorageService } from "../services/localStorageService";
import { DashboardContextType, DashboardType } from "./types";

export const DashboardContext = React.createContext<DashboardContextType>({
  dashboards: [],
  dashboard: { id: null, userId: null, account: [] },
  addUser: () => {},
  loginAccount: () => {},
  addAccount: () => {},
  editAccount: () => {},
  deleteAccount: () => {},
});

const appGetDashboards = (key: string): DashboardType[] => {
  return LocalStorageService.getItem<DashboardType[]>(key) ?? [];
};
const appGetDashboard = (key: string): DashboardType => {
  return (
    LocalStorageService.getItem<DashboardType>(key) ?? {
      id: null,
      userId: null,
      account: [],
    }
  );
};
const appGetError = (key: string): string => {
  return LocalStorageService.getItem<string>(key) ?? "";
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState(appGetError(ContextKey.ERROR));
  const [dashboards, setDashboards] = useState(
    appGetDashboards(ContextKey.DASHBOARDS)
  );

  const [dashboard, setDashboard] = useState(
    appGetDashboard(ContextKey.DASHBOARD)
  );

  const handleAddUser = (id: number) => {
    LocalStorageService.addUser(id);
    setDashboards(appGetDashboards(ContextKey.DASHBOARDS));
    setDashboard(appGetDashboard(ContextKey.DASHBOARD));
    setError(appGetError(ContextKey.ERROR));
  };

  const handleLoginAccount = (id: number) => {
    LocalStorageService.loginAccount(id);
    setDashboard(appGetDashboard(ContextKey.DASHBOARD));
  };

  const addAccount = (email: string, password: string) => {
    LocalStorageService.addAccount(email, password);
    setDashboards(appGetDashboards(ContextKey.DASHBOARDS));
    setDashboard(appGetDashboard(ContextKey.DASHBOARD));
  };

  const editAccount = (id: number, email: string, password: string) => {
    LocalStorageService.editAccount(id, email, password);
    setDashboards(appGetDashboards(ContextKey.DASHBOARDS));
    setDashboard(appGetDashboard(ContextKey.DASHBOARD));
  };

  const deleteAccount = (id: number) => {
    LocalStorageService.deleteAccount(id);
    setDashboards(appGetDashboards(ContextKey.DASHBOARDS));
    setDashboard(appGetDashboard(ContextKey.DASHBOARD));
  };

  const value = {
    error,
    dashboards,
    dashboard,
    addUser: useCallback((id: number) => handleAddUser(id), []),
    loginAccount: useCallback((id: number) => handleLoginAccount(id), []),
    addAccount: useCallback(
      (email: string, password: string) => addAccount(email, password),
      []
    ),
    editAccount: useCallback(
      (id: number, email: string, password: string) =>
        editAccount(id, email, password),
      []
    ),
    deleteAccount: useCallback((id: number) => deleteAccount(id), []),
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
