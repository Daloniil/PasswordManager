export interface AuthContextType {
  error: string;
  users: UserType[];
  user: UserType;
  onRegister: (email: string, password: string) => void;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
}

export interface UserType {
  id: number | null;
  email: string;
  password: string;
}

export type NotificationContextType = {
  notification: string | null;
  statusNotification: string | null;
  addNotification: (message: string, status: string) => void;
  removeNotification: () => void;
};
