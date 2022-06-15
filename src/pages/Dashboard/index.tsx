import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const { user, onLogout } = useAuth();

  const logout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Box>
      {user.email}
      <Box onClick={logout}>Logout</Box>
    </Box>
  );
};
