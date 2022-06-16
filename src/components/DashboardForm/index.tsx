import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDashboard } from "../../hooks/useDashboard";
import { modalStyle } from "../../style/formStyle";
import { DashboardProps } from "../../types/DashboarbForm";
import { buttonForm, textFieldContainer } from "../../style/dashboardStyle";

const schema = yup.object().shape({
  name: yup.string().required("Incorrect entry"),
  email: yup.string().required("Incorrect entry").email(),
  password: yup.string().required("Incorrect entry"),
});

export const DashboardForm = ({
  handleClose,
  id,
  name,
  email,
  password,
}: {
  handleClose: () => void;
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DashboardProps>({
    resolver: yupResolver(schema),
  });

  const { addAccount, editAccount } = useDashboard();

  const dashboard = async (data: DashboardProps) => {
    if (id) {
      editAccount(id, data.name, data.email, data.password);
    } else {
      addAccount(data.name, data.email, data.password);
    }
    handleClose();
  };

  return (
    <Box sx={modalStyle}>
      <form
        onSubmit={handleSubmit((data) => {
          dashboard(data);
        })}
      >
        <Box sx={textFieldContainer}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Name:
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Name"
            autoComplete="current-password"
            sx={{ width: "65%", margin: "-10px 0 0 58px" }}
            error={!!errors.name}
            defaultValue={name ? name : ""}
            {...register("name", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.name?.message}
          />
        </Box>

        <Box sx={textFieldContainer}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Email:
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Email"
            sx={{ width: "65%", margin: "-10px 0 0 63px" }}
            error={!!errors.email}
            defaultValue={email ? email : ""}
            {...register("email", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.email?.message}
          />
        </Box>

        <Box sx={textFieldContainer}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Password:
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Password"
            autoComplete="current-password"
            type="password"
            sx={{ width: "65%", margin: "-10px 0 0 25px" }}
            error={!!errors.password}
            defaultValue={password ? password : ""}
            {...register("password", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.password?.message}
          />
        </Box>

        <Button variant="contained" type="submit" sx={buttonForm}>
          {id ? "Edit" : "Add"}
        </Button>
      </form>
    </Box>
  );
};
