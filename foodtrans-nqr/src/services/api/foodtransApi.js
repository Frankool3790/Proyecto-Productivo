const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path, options = {}, token = '') {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Error de API (${response.status}).`;
    try {
      message = (await response.json()).message || message;
    } catch {
      // Keep the generic message if the server did not return JSON.
    }
    throw new Error(message);
  }

  return response.json();
}

export const foodtransApi = {
  login(credentials) {
    return request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
  },
  getClients(token) {
    return request('/admin/clients', {}, token);
  },
  createClient(account, token) {
    return request('/admin/clients', { method: 'POST', body: JSON.stringify(account) }, token);
  },
  updateClient(id, account, token) {
    return request(`/admin/clients/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(account) }, token);
  },
  getMe(token) {
    return request('/auth/me', {}, token);
  },
  getData(token) {
    return request('/data', {}, token);
  },
  getMovements(token) {
    return request('/movements', {}, token);
  },
  createMovement(movement, token) {
    return request('/movements', { method: 'POST', body: JSON.stringify(movement) }, token);
  },
  createTrip(trip, token) {
    return request('/trips', {
      method: 'POST',
      body: JSON.stringify(trip),
    }, token);
  },
  updateTripStatus(id, status, token) {
    return request(`/trips/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }, token);
  },
  createDocument(document, token) {
    return request('/documents', {
      method: 'POST',
      body: JSON.stringify(document),
    }, token);
  },
  updateVehicleStatus(id, status, token) {
    return request(`/vehicles/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }, token);
  },
};
