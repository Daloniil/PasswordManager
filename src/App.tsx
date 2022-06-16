import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "./providers/AuthProvider";
import { NotificationProvider } from "./providers/NotificationProvider";
import { AppRoutes } from "./routers";
import { theme } from "./theme";
import Notification from "./components/Notification";
import { DashboardProvider } from "./providers/DashboardProvider";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <AuthProvider>
          <DashboardProvider>
            <AppRoutes />
            <Notification />
          </DashboardProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
