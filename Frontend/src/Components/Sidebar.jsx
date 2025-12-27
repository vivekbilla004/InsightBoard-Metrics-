const Sidebar = ({ tab, setTab, role }) => {
  const itemClass = (name) =>
    `w-full  text-left font-medium px-4 py-2 rounded-md text-sm transition
     ${
       tab === name
         ? "bg-white/10 text-white"
         : "text-gray-400 hover:bg-white/5 hover:text-white"
     }`;

  return (
    <aside className="w-64 pl-4 bg-[#1f2228] border-r border-white/10 p-4">
      {/* <h1 className="text-xl font-semibold text-white mb-6">
        InsightBoard
      </h1> */}

      <nav className="space-y-2">
        <button
          className={itemClass("overview")}
          onClick={() => setTab("overview")}
        >
          Overview
        </button>

        <button
          className={itemClass("logs")}
          onClick={() => setTab("logs")}
        >
          Logs
        </button>

        <button
          className={itemClass("charts")}
          onClick={() => setTab("charts")}
        >
          Charts
        </button>

        {role === "admin" && (
          <button
            className={itemClass("users")}
            onClick={() => setTab("users")}
          >
            User Management
          </button>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
