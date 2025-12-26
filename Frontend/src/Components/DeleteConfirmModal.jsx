import Modal from "./Modal";

const DeleteConfirmModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-3 text-red-600">
        Delete User
      </h2>
      <p className="text-sm text-gray-600">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
