import React from "react";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-white rounded-xl bg-blue-700 p-2">
          InsightBoard Metrics
        </h1>
        <p className="text-sm text-black p-2">
          Real-time backend observability
        </p>
      </div>

      <div className="flex gap-1">
        <span onClick={handleLogout} className="px-3 py-1 text-xs rounded-full bg-black-100 text-red-700 cursor-pointer hover:bg-red-200 hover:text-red-800">
          Logout
        </span>
        {/* <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button> */}
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
          ● Live
        </span>
      </div>
    </div>
  );
};

export default Header;
