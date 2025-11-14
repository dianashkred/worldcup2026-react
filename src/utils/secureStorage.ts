const SECRET = "wc2026_secret_key";

export function saveToken(token: string): void {
  const encoded = btoa(token + SECRET);
  localStorage.setItem("auth_token", encoded);
}

export function loadToken(): string | null {
  const stored = localStorage.getItem("auth_token");
  if (!stored) return null;

  try {
    const decoded = atob(stored);
    return decoded.replace(SECRET, "");
  } catch {
    return null;
  }
}

export function clearToken(): void {
  localStorage.removeItem("auth_token");
}
