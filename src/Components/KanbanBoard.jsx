import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
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
const onDragEnd = (result) => {
const { source, destination } = result;
if (!destination) return;
if (
source.droppableId === destination.droppableId &&
source.index === destination.index
) {
return;
}
const sourceColId = source.droppableId;
const destColId = destination.droppableId;
const sourceItems = [...columns[sourceColId]];
const destItems = sourceColId === destColId ? sourceItems : [...columns[destColId]];    
const [movedTask] = sourceItems.splice(source.index, 1);    
destItems.splice(destination.index, 0, movedTask);
setColumns({
...columns,
[sourceColId]: sourceItems,
[destColId]: destItems,
});
};
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
<div className="p-10 bg-gray-50 min-h-screen">
<h1 className="text-2xl font-bold text-gray-800 mb-6">Kanban Board</h1>
<button
onClick={() => setShowModal(true)}
className="bg-blue-500 text-white px-4 py-2 rounded mb-8"
>
Add Task
</button>
<DragDropContext onDragEnd={onDragEnd}>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{Object.entries(columns).map(([columnId, tasks]) => (
<div key={columnId} className="flex flex-col">
<h2 className="font-semibold mb-4 capitalize text-gray-600 flex items-center">
{columnId} 
<span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
{tasks.length}
</span>
</h2>
<Droppable droppableId={columnId}>
{(provided, snapshot) => (
<div
{...provided.droppableProps}
ref={provided.innerRef}
className={`p-4 rounded-xl transition-colors min-h-[500px] ${
snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-100"
}`}
>
{tasks.map((task, index) => (
<Draggable key={task.id} draggableId={task.id} index={index}>
{(provided, snapshot) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
style={{
...provided.draggableProps.style,
opacity: snapshot.isDragging ? 0.8 : 1
}}
className="mb-3"
>
<TaskCard
task={task}
columnId={columnId}
deleteTask={deleteTask}
setEditingTask={setEditingTask}
/>
</div>
)}
</Draggable>
))}
{provided.placeholder}
</div>
)}
</Droppable>
</div>
))}
</div>
</DragDropContext>
{showModal && (
<AddTaskModal setShowModal={setShowModal} addTask={addTask} />
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
};
export default KanbanBoard;