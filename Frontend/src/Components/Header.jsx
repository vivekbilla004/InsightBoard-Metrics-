import React from "react";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };
  return (
    <div className="flex justify-between items-center p-2 h-30  bg-[#1f2228]  border-white/10">
      <div className="flex flex-col ml-4">
        <h1 className="text-xl mt-2 font-semibold text-white rounded-xl bg-blue-700 p-2">
          InsightBoard Metrics
        </h1>
        <p className="text-sm text-grey p-2">
          Real-time backend observability
        </p>
      </div>

      <div className="flex gap-1 mr-10">
        <span onClick={handleLogout} className="px-3 py-1 text-shadow-md font-semibold rounded-full bg-black-100 text-red-700 cursor-pointer hover:bg-red-200 hover:text-red-800">
          Logout
        </span>
        <span className="px-3 py-1 text-shadow-md font-medium rounded-full bg-green-100 text-green-700">
          ● Live
        </span>
      </div>
    </div>
  );
};

export default Header;
