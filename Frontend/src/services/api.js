const BASE_URL = "http://localhost:5000/api";

export const fetchOverview = async () => {
  const res = await fetch(`${BASE_URL}/metrics/overview`);
  return res.json();
};

export const fetchLogs = async () => {
  const res = await fetch(`${BASE_URL}/logs?limit=10`);
  return res.json();
};

export const fetchTraffic = async () => {
  const res = await fetch(`${BASE_URL}/charts/traffic`);
  return res.json();
};

export const fetchErrors = async () => {
  const res = await fetch(`${BASE_URL}/charts/errors`);
  return res.json();
};
