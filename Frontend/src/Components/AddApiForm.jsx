import { useState } from "react";

const AddApiForm = ({ onAdd }) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
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
        method: "GET",
      }),
    });

    setLoading(false);
    setUrl("");
    setName("");
    onAdd(); // reload list
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
        <input
        type="name"
        placeholder="type here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-2 w-96 text-black border mr-2"
      />
      <input
        type="url"
        placeholder="https://api.example.com/health"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="p-2 w-96 text-black border"
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-600 text-white"
        disabled={loading}
      >
        {loading ? "Checking..." : "Monitor"}
      </button>
    </form>
  );
};

export default AddApiForm;
