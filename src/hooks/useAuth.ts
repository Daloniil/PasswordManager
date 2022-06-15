import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAuth = () => {
  const { error, users, user, onRegister, onLogin, onLogout } =
    useContext(AuthContext);

  return {
    error,
    users,
    user,
    onRegister,
    onLogin,
    onLogout,
  };
};
