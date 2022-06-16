import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/AuthForm";
import { authStyle, backAuth } from "../../style/authStyle";

export const AuthPage = () => {
  const navigate = useNavigate();

  const link = window.location.pathname;

  return (
    <Box>
      <Button variant="contained" sx={backAuth} onClick={() => navigate("/")}>
        Back
      </Button>
      <Box sx={{ margin: "15% 0 0 0" }}>
        <Typography sx={authStyle}>
          {link === "/register" ? "Register" : "Login"}
        </Typography>
        <AuthForm />
      </Box>
    </Box>
  );
};
