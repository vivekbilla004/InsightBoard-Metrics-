import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    // 🔐 FORCE PASSWORD CHANGE (THIS IS THE LINE YOU ASKED ABOUT)
    if (data.forcePasswordChange) {
      navigate("/change-password");
      return;
    }

    // ✅ normal login
    navigate("/");

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-sm w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-gray-900">
          InsightBoard Login
        </h1>
        <p className="text-sm text-gray-500">
          Sign in to access observability dashboard
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
        )}

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            className="w-full border rounded px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
        <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-700">
          <p className="text-sm text-gray-300 font-semibold mb-2">
            Demo Access
          </p>

          <p className="text-xs text-gray-400 mb-3">
            Use the demo account below to explore all monitoring features. You
            can add APIs, track performance, and view status changes.
          </p>

          <div className="text-xs text-gray-400 mb-3">
            <div>
              Email:{" "}
              <span className="text-gray-200">admin@insightboard.com</span>
            </div>
            <div>
              Password: <span className="text-gray-200">admin123</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setEmail("admin@insightboard.com");
              setPassword("admin123");
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-sm"
          >
            Use Demo Credentials
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
