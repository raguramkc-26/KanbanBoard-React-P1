import { useState } from "react";
const AddTaskModal= ({ setShowModal, addTask }) => {
  const [title, setTitle] = useState("");
  const [column, setColumn] = useState("todo");

  const handleAdd = () => {
    if (!title.trim()) return;

    addTask(title, column);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-80">

        <h2 className="text-xl font-bold mb-4">
          Add Task
        </h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-3"
          onChange={e => setColumn(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>

      </div>

    </div>
  );
}

export default AddTaskModal;