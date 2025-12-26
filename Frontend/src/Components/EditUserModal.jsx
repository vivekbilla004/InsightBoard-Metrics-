import { useState } from "react";
import Modal from "./Modal";

const EditUserModal = ({ open, user, onClose, onSuccess }) => {
  const [form, setForm] = useState(user || {});

  if (!user) return null;

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: form.role,
          title: form.title,
        }),
      }
    );

    onSuccess();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>

      <input
        className="border p-2 w-full mb-3 rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="border p-2 w-full rounded"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="developer">Developer</option>
        <option value="admin">Admin</option>
      </select>

      <div className="flex justify-end gap-3 pt-4">
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={handleSave}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditUserModal;
