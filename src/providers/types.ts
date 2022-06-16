export interface AuthContextType {
  users: UserType[];
  user: UserType;
  onRegister: (email: string, password: string) => string;
  onLogin: (email: string, password: string) => string;
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

export interface DashboardContextType {
  dashboards: DashboardType[];
  dashboard: DashboardType;
  addUser: (id: number) => void;
  loginAccount: (id: number) => void;
  addAccount: (email: string, password: string) => void;
  editAccount: (id: number, email: string, password: string) => void;
  deleteAccount: (id: number) => void;
}

export interface DashboardType {
  id: number | null;
  userId: number | null;
  account: AccountType[];
}

export interface AccountType {
  id: number;
  email: string;
  password: string;
}
