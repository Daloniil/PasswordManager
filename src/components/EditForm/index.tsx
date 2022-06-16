import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDashboard } from "../../hooks/useDashboard";
import { modalStyle } from "../../style/formStyle";
import { FormProps } from "../../types/FormProps";

const schema = yup.object().shape({
  email: yup.string().required("Incorrect entry").email(),
  password: yup.string().required("Incorrect entry"),
});

export const EditForm = ({
  handleCloseEdit,
  id,
  email,
  password,
}: {
  handleCloseEdit: () => void;
  id: number;
  email: string;
  password: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const { editAccount } = useDashboard();

  const edit = async (data: FormProps) => {
    editAccount(id, data.email, data.password);
    handleCloseEdit();
  };

  return (
    <Box sx={modalStyle}>
      <form
        onSubmit={handleSubmit((data) => {
          edit(data);
        })}
      >
        <Box sx={{ display: "flex", margin: "15px 0 0 0" }}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Email:
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Email"
            sx={{ width: "65%", margin: "-10px 0 0 63px" }}
            error={!!errors.email}
            {...register("email", { required: true })}
            defaultValue={email}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.email?.message}
          />
        </Box>

        <Box sx={{ display: "flex", margin: "35px 0 0 0" }}>
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
            {...register("password", { required: true })}
            defaultValue={password}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.password?.message}
          />
        </Box>

        <Button
          variant="contained"
          type="submit"
          sx={{ margin: " 15px 0 0 79%" }}
        >
          Edit
        </Button>
      </form>
    </Box>
  );
};
