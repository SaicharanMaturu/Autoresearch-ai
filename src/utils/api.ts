export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const token = localStorage.getItem('token');
  const headers = new Headers(init?.headers as HeadersInit || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(input, { ...(init || {}), headers });
  if (res.status === 401) {
    try { localStorage.removeItem('token'); } catch (e) {}
    // Redirect to login so app can re-authenticate
    if (typeof window !== 'undefined') window.location.href = '/login';
  }
  return res;
}

export default apiFetch;
