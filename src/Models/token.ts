import { User } from "./user";

export function getToken(): User | null {
  const token: string | null = sessionStorage.getItem("token");
  if (!token) {
    return null;
  }
  const payload = token.split(".")[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const user: User = JSON.parse(jsonPayload);
  return user;
}


export function setToken(token: string): void {
  sessionStorage.setItem("token", token);
}

export function ereaseToken(): void {
  sessionStorage.removeItem("token");
}