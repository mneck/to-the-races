const API_BASE = '/api';

function getAuthToken(): string | null {
  return localStorage.getItem('token');
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<{ token: string; email: string; displayName: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, displayName: string) =>
    apiRequest<{ token: string; email: string; displayName: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName }),
    }),
};

export const checkoutApi = {
  createSession: (productName: string, amountInCents: number, currency: string) =>
    apiRequest<{ url: string }>('/checkout/create-session', {
      method: 'POST',
      body: JSON.stringify({
        productName,
        amountInCents,
        currency,
      }),
    }),
};
