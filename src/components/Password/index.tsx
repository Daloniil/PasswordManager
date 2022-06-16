import { Box } from "@mui/material";
import { useState } from "react";

export const Password = ({ password }: { password: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ display: "inline-block" }} onClick={handleShowPassword}>
      Password:
      {showPassword ? password : "*".repeat(password.length)}
    </Box>
  );
};
