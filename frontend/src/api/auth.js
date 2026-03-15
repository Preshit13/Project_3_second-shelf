const API_BASE = "/api/auth";

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to register");
  }

  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to login");
  }

  return data;
}

export async function logoutUser() {
  const response = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to logout");
  }

  return data;
}

export async function fetchCurrentUser() {
  const response = await fetch(`${API_BASE}/me`, {
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    return { authenticated: false, user: null };
  }

  return data;
}