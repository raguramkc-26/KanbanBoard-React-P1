import { useState } from "react";

const EditTaskModal=({ task, columnId, setEditingTask, updateTask }) => {

  const [title, setTitle] = useState(task.title);

  const handleUpdate = () => {
    updateTask(columnId, { ...task, title });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-80">

        <h2 className="text-xl font-bold mb-4">
          Edit Task
        </h2>

        <input
          className="border p-2 w-full mb-3"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>

      </div>

    </div>
  );
}

export default EditTaskModal;