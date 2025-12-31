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

// API Monitor
export const getMonitoredApis = async () => {
  const res = await fetch(`${BASE_URL}/api/monitor`);

  if (!res.ok) {
    throw new Error("Failed to fetch monitored APIs");
  }

  return res.json();
};

// API Summary
export const getApiSummary = async (apiId) => {
  const res = await fetch(`${BASE_URL}/api/monitor/${apiId}/summary`);

  if (!res.ok) {
    throw new Error("Failed to fetch API summary");
  }

  return res.json();
};

// API Metrics
export const getApiMetrics = async (apiId) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/monitor/${apiId}/metrics`
  );

  if (!res.ok) throw new Error("Failed to fetch metrics");
  return res.json();
};
