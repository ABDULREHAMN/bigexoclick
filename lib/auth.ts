// Authentication utility for managing login sessions
export const AUTH_STORAGE_KEY = "isLoggedIn"
export const USERNAME_STORAGE_KEY = "username"

export function setLoginSession(username: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, "true")
    localStorage.setItem(USERNAME_STORAGE_KEY, username)
  }
}

export function clearLoginSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(USERNAME_STORAGE_KEY)
  }
}

export function isLoggedIn(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true"
  }
  return false
}

export function getUsername(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem(USERNAME_STORAGE_KEY) || ""
  }
  return ""
}
