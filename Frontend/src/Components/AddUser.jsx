import { useState } from "react";

const AddUser = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "developer",
    title: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      }
    );

    const data = await res.json();
    alert(`User created. Temp password: ${data.tempPassword}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm space-y-4 max-w-md m-auto"
    >
      <h2 className="text-lg font-semibold">Add User</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Title (e.g. Backend Developer)"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="developer">Developer</option>
        <option value="admin">Admin</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Create User
      </button>
      <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button className="bg-black text-white px-4 py-2 rounded">
            Create
          </button>
        </div>
    </form>
  );
};

export default AddUser;
