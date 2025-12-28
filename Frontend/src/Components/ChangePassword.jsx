import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Password updated successfully");
    navigate("/"); // go to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0d12] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#151821] p-6 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 rounded bg-black/30 border border-white/10"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-2 rounded bg-black/30 border border-white/10"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="w-full bg-white text-black py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
