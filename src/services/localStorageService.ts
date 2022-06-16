import { DashboardType, UserType } from "../providers/types";
import { ContextKey } from "./localKey";

type ItemType = string;

export class LocalStorageService {
  public static getItem<T>(key: ItemType) {
    try {
      let item = localStorage.getItem(key);

      item = item ?? sessionStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }

  public static setUsers(email: string, password: string, session = false) {
    const storage = session ? sessionStorage : localStorage;

    const users =
      LocalStorageService.getItem<UserType[]>(ContextKey.USERS) ?? [];

    const repeated = users.filter((user) => user.email === email);
    if (repeated.length === 0) {
      const id = users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1;
      const user = {
        id: id,
        email: email,
        password: password,
      };

      users.push(user);

      storage.setItem(ContextKey.USERS, JSON.stringify(users));
      storage.setItem(ContextKey.USER, JSON.stringify(user));
      return "";
    } else {
      return "The user with this email address is already registered";
    }
  }

  public static setUser(email: string, password: string, session = false) {
    const storage = session ? sessionStorage : localStorage;

    const users =
      LocalStorageService.getItem<UserType[]>(ContextKey.USERS) ?? [];

    const result = users.filter(
      (user) => user.email === email && user.password === password
    );

    if (result.length > 0) {
      storage.setItem(ContextKey.USER, JSON.stringify(result[0]));
      return "";
    } else {
      return "Wrong login or password";
    }
  }

  public static removeUser(session = false) {
    const storage = session ? sessionStorage : localStorage;

    const user = {
      id: null,
      email: "",
      password: "",
    };

    storage.setItem(ContextKey.USER, JSON.stringify(user));
  }

  public static addUser(userId: number, session = false) {
    const storage = session ? sessionStorage : localStorage;

    const dashboards =
      LocalStorageService.getItem<DashboardType[]>(ContextKey.DASHBOARDS) ?? [];

    const id =
      dashboards.length > 0
        ? Number(dashboards[dashboards.length - 1].id) + 1
        : 1;

    const dashboard = {
      id: id,
      userId: userId,
      account: [],
    };

    dashboards.push(dashboard);
    storage.setItem(ContextKey.DASHBOARDS, JSON.stringify(dashboards));
    storage.setItem(ContextKey.DASHBOARD, JSON.stringify(dashboard));
  }

  public static loginAccount(userId: number, session = false) {
    const storage = session ? sessionStorage : localStorage;

    const dashboards =
      LocalStorageService.getItem<DashboardType[]>(ContextKey.DASHBOARDS) ?? [];

    const dashboard = dashboards.filter(
      (dashboard) => dashboard.userId === userId
    );

    storage.setItem(ContextKey.DASHBOARD, JSON.stringify(dashboard[0]));
  }

  public static addAccount(email: string, password: string, session = false) {
    const storage = session ? sessionStorage : localStorage;

    const dashboards =
      LocalStorageService.getItem<DashboardType[]>(ContextKey.DASHBOARDS) ?? [];

    const dashboard = LocalStorageService.getItem<DashboardType>(
      ContextKey.DASHBOARD
    ) ?? {
      id: null,
      userId: null,
      account: [],
    };

    const accountId =
      dashboard.account.length > 0
        ? Number(dashboard.account[dashboard.account.length - 1].id) + 1
        : 1;

    const newDashboard = {
      id: accountId,
      email: email,
      password: password,
    };

    dashboard.account.push(newDashboard);
    dashboards[Number(dashboard.id) - 1].account.push(newDashboard);
    storage.setItem(ContextKey.DASHBOARD, JSON.stringify(dashboard));
    storage.setItem(ContextKey.DASHBOARDS, JSON.stringify(dashboards));
  }

  public static editAccount(
    accountId: number,
    email: string,
    password: string,
    session = false
  ) {
    const storage = session ? sessionStorage : localStorage;

    const dashboards =
      LocalStorageService.getItem<DashboardType[]>(ContextKey.DASHBOARDS) ?? [];

    const dashboard = LocalStorageService.getItem<DashboardType>(
      ContextKey.DASHBOARD
    ) ?? {
      id: null,
      userId: null,
      account: [],
    };

    dashboard.account[accountId - 1].email = email;
    dashboard.account[accountId - 1].password = password;

    dashboards[Number(dashboard.id) - 1] = dashboard;
    storage.setItem(ContextKey.DASHBOARD, JSON.stringify(dashboard));
    storage.setItem(ContextKey.DASHBOARDS, JSON.stringify(dashboards));
  }

  public static deleteAccount(accountId: number, session = false) {
    const storage = session ? sessionStorage : localStorage;

    const dashboards =
      LocalStorageService.getItem<DashboardType[]>(ContextKey.DASHBOARDS) ?? [];

    const dashboard = LocalStorageService.getItem<DashboardType>(
      ContextKey.DASHBOARD
    ) ?? {
      id: null,
      userId: null,
      account: [],
    };

    dashboard.account.splice(accountId - 1, 1);
    dashboards[Number(dashboard.id) - 1] = dashboard;

    storage.setItem(ContextKey.DASHBOARD, JSON.stringify(dashboard));
    storage.setItem(ContextKey.DASHBOARDS, JSON.stringify(dashboards));
  }
}
