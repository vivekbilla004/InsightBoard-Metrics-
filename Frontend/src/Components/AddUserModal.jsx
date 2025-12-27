import { useState } from "react";
import Modal from "./Modal";

const AddUserModal = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "developer",
    title: "",
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    alert(`User created. Temp password: ${data.tempPassword}`);

    onSuccess();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Add User</h2>

      <form onSubmit={handleSubmit} className="space-y-3 ">
        <input
          placeholder="Full name"
          className="border p-2 w-full rounded text-gray-900"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="border p-2 w-full rounded text-gray-900"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Title (e.g. Backend Developer)"
          className="border p-2 w-full rounded text-gray-900"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="border p-2 w-full rounded text-gray-900"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="developer">Developer</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-3 pt-2 text-gray-800">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-black text-white px-4 py-2 rounded">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
