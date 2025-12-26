const BASE_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

// Metrics
export const fetchOverview = async () => {
  return fetch(`${BASE_URL}/api/metrics/overview`, {
    headers: getAuthHeaders()
  }).then(res => res.json());
};

// Logs (ADMIN)
export const fetchLogs = async (limit = 10) => {
  return fetch(`${BASE_URL}/api/logs?limit=${limit}`, {
    headers: getAuthHeaders()
  }).then(res => res.json());
};

// Charts
export const fetchTraffic = async () => {
  return fetch(`${BASE_URL}/api/charts/traffic`, {
    headers: getAuthHeaders()
  }).then(res => res.json());
};

export const fetchErrors = async () => {
  return fetch(`${BASE_URL}/api/charts/errors`, {
    headers: getAuthHeaders()
  }).then(res => res.json());
};
