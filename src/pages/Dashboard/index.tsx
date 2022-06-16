import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardForm } from "../../components/DashboardForm";
import { Edit } from "../../components/Edit";
import { Password } from "../../components/Password";
import { useAuth } from "../../hooks/useAuth";
import { useDashboard } from "../../hooks/useDashboard";
import {
  accountDashboard,
  barDashboardStyle,
  buttonDashboard,
  containerDashboard,
  emailDashboard,
} from "../../style/dashboardStyle";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const { user, onLogout } = useAuth();
  const { dashboards, dashboard, addUser, loginAccount, deleteAccount } =
    useDashboard();

  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);

  const handleCloseAdd = () => setOpenAdd(false);

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
      <Box sx={barDashboardStyle}>
        <Button variant="contained" onClick={logout} sx={{ margin: "10px" }}>
          Logout
        </Button>
        <Typography sx={emailDashboard}>{user.email}</Typography>
      </Box>

      <Box sx={containerDashboard}>
        <Button
          onClick={handleOpenAdd}
          sx={{ margin: "0 0 0 70%" }}
          variant="contained"
        >
          Add Account
        </Button>
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DashboardForm handleClose={handleCloseAdd} />
        </Modal>
        <Box sx={{ margin: "25px 0 0 0" }}>
          {dashboard.account.map((elem) => (
            <Box key={elem.id} sx={accountDashboard}>
              <Box>
                <Typography sx={{ fontSize: "18px" }}>
                  Name: {elem.name}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  Email: {elem.email}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  <Password password={elem.password} />
                </Typography>
              </Box>
              <Box>
                <Edit
                  id={elem.id}
                  name={elem.name}
                  email={elem.email}
                  password={elem.password}
                />
                <Button
                  variant="contained"
                  onClick={() => deleteAccount(elem.id)}
                  sx={buttonDashboard}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
