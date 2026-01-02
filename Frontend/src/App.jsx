import "./App.css";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import ChangePassword from "./Components/ChangePassword";
import ApiMonitor from "./Pages/ApiMonitor";
import ApiDetails from "./Pages/ApiDetails";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path="/api-monitor"
              element={
                <ProtectedRoute>
                  <ApiMonitor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api-monitor/:apiId"
              element={
                <ProtectedRoute>
                  <ApiDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
