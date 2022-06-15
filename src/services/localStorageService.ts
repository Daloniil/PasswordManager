import { UserType } from "../providers/types";
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
    storage.setItem(ContextKey.ERROR, JSON.stringify(""));

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
    } else {
      storage.setItem(
        ContextKey.ERROR,
        JSON.stringify("The user with this email address is already registered")
      );
    }
  }

  public static setUser(email: string, password: string, session = false) {
    const storage = session ? sessionStorage : localStorage;
    storage.setItem(ContextKey.ERROR, JSON.stringify(""));

    const users =
      LocalStorageService.getItem<UserType[]>(ContextKey.USERS) ?? [];

    const result = users.filter(
      (user) => user.email === email && user.password === password
    );

    if (result.length > 0) {
      storage.setItem(ContextKey.USER, JSON.stringify(result[0]));
    } else {
      storage.setItem(
        ContextKey.ERROR,
        JSON.stringify("Wrong login or password")
      );
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
}
