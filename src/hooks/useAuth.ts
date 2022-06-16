import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAuth = () => {
  const { users, user, onRegister, onLogin, onLogout } =
    useContext(AuthContext);

  return {
    users,
    user,
    onRegister,
    onLogin,
    onLogout,
  };
};
