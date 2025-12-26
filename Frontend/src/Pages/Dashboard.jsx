import { useEffect, useRef, useState } from "react";
import {
  fetchOverview,
  fetchLogs,
  fetchErrors,
  fetchTraffic,
} from "../services/api";
import socket from "../services/socket";
import MetricsCards from "../Components/MetricsCards";
import LogsTable from "../Components/LogTable";
import AlertBanner from "../Components/AlertBanner";
import TrafficChart from "../Components/TrafficChart";
import ErrorChart from "../Components/ErrorChart";
import Header from "../Components/Header";
import UserManagement from "../Components/UserManagement";

const Dashboard = () => {
  const [overview, setOverview] = useState({});
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [traffic, setTraffic] = useState([]);
  const [errors, setErrors] = useState([]);
  const [tab, setTab] = useState("overview");
  const role = localStorage.getItem("role");

  // 🔐 prevents API from overwriting realtime logs
  const isInitialLoadDone = useRef(false);

  /* -------------------------------
     1️⃣ Load initial data ONCE
  -------------------------------- */
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const overviewData = await fetchOverview();
        const logsData = await fetchLogs();

        setOverview(overviewData);

        // ✅ only set logs if socket hasn't updated yet
        if (!isInitialLoadDone.current) {
          setLogs(logsData.logs || []);
          isInitialLoadDone.current = true;
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    loadInitialData();
  }, []);

  // Real-time log listener
  useEffect(() => {
    const handleNewLog = (log) => {
      console.log("🔥 realtime log:", log);

      setLogs((prev) => {
        isInitialLoadDone.current = true; // 🔒 lock API overwrite
        return [log, ...prev];
      });
    };

    socket.on("new-log", handleNewLog);

    return () => {
      socket.off("new-log", handleNewLog);
    };
  }, []);

  // Alerts listener
  useEffect(() => {
    socket.on("alert", (alert) => {
      console.log("🚨 realtime alert:", alert);
      setAlerts((prev) => [alert, ...prev]);
    });

    return () => socket.off("alert");
  }, []);

  // Metrics update listener
  useEffect(() => {
    const handleMetricsUpdate = (metrics) => {
      console.log("📊 realtime metrics:", metrics);
      setOverview(metrics);
    };

    socket.on("metrics-update", handleMetricsUpdate);

    return () => {
      socket.off("metrics-update", handleMetricsUpdate);
    };
  }, []);

  // Charts data load and real-time update
  useEffect(() => {
    const loadCharts = async () => {
      setTraffic(await fetchTraffic());
      setErrors(await fetchErrors());
    };

    // initial load
    loadCharts();

    // refresh charts every 10 seconds
    const interval = setInterval(() => {
      loadCharts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-col min-h-screen bg-slate-100 px-6 py-6">
  <div className="max-w-7xl mx-auto space-y-6">
    
    <Header />

    {/* Navigation */}
    <div className="flex gap-6 ">
      <button onClick={() => setTab("overview")} className="px-4 py-2 bg-gray-200 rounded">Overview</button>
      <button onClick={() => setTab("logs")} className="px-4 py-2 bg-gray-200 rounded">Logs</button>
      <button onClick={() => setTab("charts")} className="px-4 py-2 bg-gray-200 rounded">Charts</button>

      {role === "admin" && (
        <button onClick={() => setTab("users")} className="px-4 py-2 bg-gray-200 rounded">
          User Management
        </button>
      )}
    </div>

    {/* Content */}
    {/* {tab === "overview" && (
      <>
        <MetricsCards data={overview} />
      </>
    )} */}
    <MetricsCards data={overview} />
    {tab === "logs" && <LogsTable logs={logs} />}

    {tab === "charts" && (
      <>
        <TrafficChart data={traffic} />
        <ErrorChart data={errors} />
      </>
    )}

    {tab === "users" && role === "admin" && (
      <UserManagement />
    )}
  </div>
</div>

  //   <div className="min-h-screen bg-slate-100 px-6 py-6">
  //     <div className="max-w-7xl mx-auto space-y-6">
  //       {/* {role === "admin" && <UserManagement />} */}
  //       <Header />
  //         {role === "admin" && (
  //   <button onClick={() => setTab("users")}>
  //     User Management
  //   </button>
  // )}
  //       <MetricsCards data={overview} />
  //       <LogsTable logs={logs} />
  //       <AlertBanner alerts={alerts} />
  //       <TrafficChart data={traffic} />
  //       <ErrorChart data={errors} />
  //       {/* Header */}
  //       {/* Metrics */}
  //       {/* Charts */}
  //       {/* Logs */}
  //     </div>
  //   </div>

    // <div className="min-h-screen bg-gray-100 p-8">
    //   <h2 className="text-2xl font-bold mb-6">InsightBoard Dashboard</h2>

    //   <MetricsCards data={overview} />

    //   <div className="mt-6">
    //     <LogsTable logs={logs} />
    //   </div>
    //   <AlertBanner alerts={alerts} />
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    //     <TrafficChart data={traffic} />
    //     <ErrorChart data={errors} />
    //   </div>
    // </div>
  );
};

export default Dashboard;
