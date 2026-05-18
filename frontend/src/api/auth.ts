import type { LoginResponse, UserPublic } from '../types';

// In dev: empty string → vite proxy handles /api → :8000
// In prod: set VITE_API_BASE_URL at docker build time (or leave empty if
// frontend is served behind the same ALB as the API).
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      /* body wasn't JSON — keep statusText */
    }
    throw new HttpError(res.status, detail);
  }
  return res.json() as Promise<T>;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return request<LoginResponse>('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function me(token: string): Promise<UserPublic> {
  return request<UserPublic>('/api/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export { HttpError };
