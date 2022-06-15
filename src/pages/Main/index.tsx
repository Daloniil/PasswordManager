import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box onClick={() => navigate("/register")}>Registration</Box>
      <Box onClick={() => navigate("/login")}>Login</Box>
    </Box>
  );
};
