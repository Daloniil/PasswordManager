import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "./providers/AuthProvider";
import { NotificationProvider } from "./providers/NotificationProvider";
import { AppRoutes } from "./routers";
import { theme } from "./theme";
import Notification from "./components/Notification";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <AuthProvider>
          <AppRoutes />
          <Notification />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
