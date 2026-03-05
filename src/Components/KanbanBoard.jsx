import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

const defaultColumns = {
  todo: [],
  inprogress: [],
  done: []
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(defaultColumns);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("kanbanData");
    if (saved) setColumns(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(columns));
  }, [columns]);

  const addTask = (title, column) => {
    const newTask = {
      id: Date.now().toString(),
      title
    };

    setColumns({
      ...columns,
      [column]: [...columns[column], newTask]
    });
  };

  const deleteTask = (columnId, taskId) => {
    const filtered = columns[columnId].filter(
      task => task.id !== taskId
    );

    setColumns({
      ...columns,
      [columnId]: filtered
    });
  };

  const updateTask = (columnId, updatedTask) => {
    const updated = columns[columnId].map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setColumns({
      ...columns,
      [columnId]: updated
    });

    setEditingTask(null);
  };

  return (
    <div className="p-10">

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Add Task
      </button>

      <div className="grid grid-cols-3 gap-6">

        {Object.entries(columns).map(([columnId, tasks]) => (

          <div key={columnId} className="bg-gray-100 p-4 rounded-lg">

            <h2 className="font-bold mb-4 capitalize">
              {columnId}
            </h2>

            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                columnId={columnId}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
              />
            ))}

          </div>

        ))}

      </div>

      {showModal && (
        <AddTaskModal
          setShowModal={setShowModal}
          addTask={addTask}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask.task}
          columnId={editingTask.columnId}
          setEditingTask={setEditingTask}
          updateTask={updateTask}
        />
      )}

    </div>
  );
}

export default KanbanBoard;