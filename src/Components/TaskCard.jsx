const TaskCard = ({ task, columnId, deleteTask, setEditingTask }) => {
return (
<div className="bg-white p-3 rounded shadow mb-3">
<p className="mb-2">{task.title}</p>
<div className="flex gap-3 text-sm">
<button
onClick={() =>
setEditingTask({ task, columnId })
}
className="text-blue-500"
>
Edit
</button>
<button
onClick={() =>
deleteTask(columnId, task.id)
}
className="text-red-500"
>
Delete
</button>
</div>
</div>
);
}
export default TaskCard;