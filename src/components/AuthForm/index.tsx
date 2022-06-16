import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { NotificationKeys } from "../../services/localKey";
import { AuthProps } from "../../types/AuthProps";
import {
  buttonAuth,
  containerAuth,
  emailAuth,
  emailFieldAuth,
  passwordAuthContainer,
  passwordFieldAuth,
} from "../../style/authStyle";

const schema = yup.object().shape({
  email: yup.string().required("Incorrect entry").email(),
  password: yup.string().required("Incorrect entry"),
});

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProps>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const link = window.location.pathname;

  const { onRegister, onLogin } = useAuth();

  const auth = async (data: AuthProps) => {
    const error =
      link === "/register"
        ? onRegister(data.email, data.password)
        : onLogin(data.email, data.password);
    if (error) {
      addNotification(error, NotificationKeys.ERROR);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Box sx={containerAuth}>
      <form
        onSubmit={handleSubmit((data) => {
          auth(data);
        })}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h1"
            sx={emailAuth}
          >
            Email Address:
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Email address"
            sx={emailFieldAuth}
            error={!!errors.email}
            {...register("email", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.email?.message}
          />
        </Box>

        <Box sx={passwordAuthContainer}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h1"
            sx={{ margin: "10px 0 0 0" }}
          >
            Password:
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Password"
            autoComplete="current-password"
            type="password"
            sx={passwordFieldAuth}
            error={!!errors.password}
            {...register("password", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.password?.message}
          />
        </Box>

        <Button variant="contained" type="submit" sx={buttonAuth}>
          {link === "/register" ? "Register" : "Sign in"}
        </Button>
      </form>
    </Box>
  );
};
