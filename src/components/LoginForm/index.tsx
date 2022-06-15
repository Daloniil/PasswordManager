import { useForm } from "react-hook-form";
import { LoginFormProps } from "../../types/LoginFormProps";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";
import { NotificationKeys } from "../../services/localKey";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().required("Incorrect entry").email(),
  password: yup.string().required("Incorrect entry"),
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const { onLogin, error, user } = useAuth();
  const { addNotification } = useNotification();

  const login = async (data: LoginFormProps) => {
    onLogin(data.email, data.password);
    if (error) {
      addNotification(error, NotificationKeys.ERROR);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit((data) => {
          login(data);
        })}
      >
        <Box sx={{ display: "flex" }}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Email address:
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Email address"
            sx={{ width: "65%", margin: "0 0 0 20px" }}
            error={!!errors.email}
            {...register("email", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.email?.message}
          />
        </Box>

        <Box sx={{ display: "flex", margin: "10px 0 0 0" }}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Password:
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Password"
            autoComplete="current-password"
            type="password"
            sx={{ width: "65%", margin: "0 0 0 45px" }}
            error={!!errors.password}
            {...register("password", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.password?.message}
          />
        </Box>

        <Button variant="contained" type="submit">
          Log In
        </Button>
      </form>
    </Box>
  );
};
