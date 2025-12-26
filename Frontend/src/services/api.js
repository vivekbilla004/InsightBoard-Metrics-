const BASE_URL = import.meta.env.VITE_API_URL;


// METRICS & LOGS FETCHERS
export const fetchOverview = async () => {
  const res = await fetch(`${BASE_URL}/api/metrics/overview`);
  return res.json();
};

export const fetchLogs = async () => {
  const res = await fetch(`${BASE_URL}/api/logs?limit=10`);
  return res.json();
};

export const fetchTraffic = async () => {
  const res = await fetch(`${BASE_URL}/api/charts/traffic`);
  return res.json();
};

export const fetchErrors = async () => {
  const res = await fetch(`${BASE_URL}/api/charts/errors`);
  return res.json();
};

// AUTHENTICATED REQUEST HELPER
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });
};
