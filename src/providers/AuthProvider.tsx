import React, { ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ContextKey } from "../services/localKey";
import { LocalStorageService } from "../services/localStorageService";
import { AuthContextType, UserType } from "./types";

export const AuthContext = React.createContext<AuthContextType>({
  users: [],
  user: { id: null, email: "", password: "" },
  onRegister: () => "",
  onLogin: () => "",
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState(appGetUsers(ContextKey.USERS));
  const [user, setUser] = useState(appGetUser(ContextKey.USER));

  const handleRegister = (email: string, password: string) => {
    const result = LocalStorageService.setUsers(email, password);
    setUsers(appGetUsers(ContextKey.USERS));
    setUser(appGetUser(ContextKey.USER));
    return result;
  };

  const handleLogin = (email: string, password: string) => {
    const result = LocalStorageService.setUser(email, password);
    setUser(appGetUser(ContextKey.USER));
    return result;
  };

  const handleLogout = () => {
    LocalStorageService.removeUser();
    setUser(appGetUser(ContextKey.USER));
    navigate("/");
  };

  const value = {
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
