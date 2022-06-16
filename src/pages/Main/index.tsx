import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { buttonMain, containerMain } from "../../style/mainStyle";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={containerMain}>
      <Button
        onClick={() => navigate("/register")}
        variant="contained"
        sx={buttonMain}
      >
        Registration
      </Button>

      <Button
        onClick={() => navigate("/login")}
        variant="contained"
        sx={buttonMain}
      >
        Login
      </Button>
    </Box>
  );
};
