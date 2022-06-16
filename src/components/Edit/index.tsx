import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { buttonDashboard } from "../../style/dashboardStyle";
import { DashboardForm } from "../DashboardForm";

export const Edit = ({
  id,
  name,
  email,
  password,
}: {
  id: number;
  name: string;
  email: string;
  password: string;
}) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <Box sx={{ display: "inline-block" }}>
      <Button variant="contained" sx={buttonDashboard} onClick={handleOpenEdit}>
        Edit
      </Button>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DashboardForm
          handleClose={handleCloseEdit}
          id={id}
          name={name}
          email={email}
          password={password}
        />
      </Modal>
    </Box>
  );
};
