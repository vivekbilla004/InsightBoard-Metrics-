import { useState } from "react";
import { Link } from "react-router-dom";

const AddApiForm = ({ onAdd }) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [method, setMethod] = useState("GET");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`${import.meta.env.VITE_API_URL}/api/monitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        url,
        method,
      }),
    });

    setLoading(false);
    setUrl("");
    setName("");
    setMethod("");
    onAdd(); // reload list
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 mx-auto flex justify-center">
        <input
        type="name"
        placeholder="type here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-2 w-96 text-black bg-white border mr-2 rounded-xl"
      />
      <input
        type="url"
        placeholder="https://api.example.com/health"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="p-2 w-96 text-black bg-white border rounded-xl"
      />
      <button
        className="w-28 ml-2 px-4 py-2 rounded-xl bg-white text-[#1f2228] font-bold"
        disabled={loading}
      >
        {loading ? "Checking..." : "Monitor"}
      </button>
      <button className="w-28 ml-2 px-4 py-2 rounded-xl bg-white text-[#1f2228] font-bold">
        <Link to="/">Home</Link>
      </button>
    </form>
  );
};

export default AddApiForm;
