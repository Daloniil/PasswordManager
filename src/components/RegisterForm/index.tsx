import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { NotificationKeys } from "../../services/localKey";
import { FormProps } from "../../types/FormProps";

const schema = yup.object().shape({
  email: yup.string().required("Incorrect entry").email(),
  password: yup.string().required("Incorrect entry"),
});

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const { onRegister } = useAuth();

  const registration = async (data: FormProps) => {
    const error = onRegister(data.email, data.password);
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
          registration(data);
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
          Register
        </Button>
      </form>
    </Box>
  );
};
