import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddForm } from "../../components/AddFrom";
import { EditForm } from "../../components/EditForm";
import { useAuth } from "../../hooks/useAuth";
import { useDashboard } from "../../hooks/useDashboard";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const { user, onLogout } = useAuth();
  const { dashboards, dashboard, addUser, loginAccount, deleteAccount } =
    useDashboard();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleOpenEdit = () => setOpenEdit(true);

  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const logout = () => {
    onLogout();
    navigate("/");
  };

  useEffect(() => {
    const repeated = dashboards.filter(
      (dashboard) => dashboard.userId === user.id
    );

    if (repeated.length === 0) {
      addUser(Number(user.id));
    } else {
      loginAccount(Number(user.id));
    }
  }, []);

  return (
    <Box>
      {user.email}
      <Box onClick={logout}>Logout</Box>
      <Box>
        <Typography onClick={handleOpenAdd}>Add Account</Typography>
      </Box>
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddForm handleCloseAdd={handleCloseAdd} />
      </Modal>
      <Box>
        {dashboard.account.map((elem) => (
          <Box key={elem.id} sx={{ display: "flex" }}>
            <Box>
              <Typography>Email: {elem.email}</Typography>
              <Typography>Password: {elem.password}</Typography>
            </Box>
            <Box>
              <Box sx={{ margin: "10px 0 0 50px" }} onClick={handleOpenEdit}>
                Edit
              </Box>
              <Box onClick={() => deleteAccount(elem.id)}>Delete</Box>
            </Box>
            <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <EditForm
                handleCloseEdit={handleCloseEdit}
                id={elem.id}
                email={elem.email}
                password={elem.password}
              />
            </Modal>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
