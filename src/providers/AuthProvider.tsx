import React, { ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextKey } from "../services/localKey";
import { LocalStorageService } from "../services/localStorageService";
import { AuthContextType, UserType } from "./types";

export const AuthContext = React.createContext<AuthContextType>({
  error: "",
  users: [],
  user: { id: null, email: "", password: "" },
  onRegister: () => {},
  onLogin: () => {},
  onLogout: () => {},
});

const appGetUsers = (key: string): UserType[] => {
  return LocalStorageService.getItem<UserType[]>(key) ?? [];
};

const appGetUser = (key: string): UserType => {
  return (
    LocalStorageService.getItem<UserType>(key) ?? {
      id: null,
      email: "",
      password: "",
    }
  );
};

const appGetError = (key: string): string => {
  return LocalStorageService.getItem<string>(key) ?? "";
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState(appGetUsers(ContextKey.USERS));
  const [user, setUser] = useState(appGetUser(ContextKey.USER));
  const [error, setError] = useState(appGetError(ContextKey.ERROR));

  const handleRegister = (email: string, password: string) => {
    LocalStorageService.setUsers(email, password);
    setUsers(appGetUsers(ContextKey.USERS));
    setUser(appGetUser(ContextKey.USER));
    setError(appGetError(ContextKey.ERROR));
  };

  const handleLogin = (email: string, password: string) => {
    LocalStorageService.setUser(email, password);
    setUser(appGetUser(ContextKey.USER));
    setError(appGetError(ContextKey.ERROR));
  };

  const handleLogout = () => {
    LocalStorageService.removeUser();
    setUser(appGetUser(ContextKey.USER));
    navigate("/");
  };

  const value = {
    error,
    users,
    user,
    onRegister: useCallback(
      (email: string, password: string) => handleRegister(email, password),
      []
    ),
    onLogin: useCallback(
      (email: string, password: string) => handleLogin(email, password),
      []
    ),
    onLogout: useCallback(handleLogout, [navigate]),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
