import { useState } from "react";
import { toast } from "react-toastify";
const AddTaskModal= ({ setShowModal, addTask }) => {
const [title, setTitle] = useState("");
const handleSubmit = (e) => {
e.preventDefault();
if (!title.trim()) { 
toast.warn("Please enter a task");
return;
}
addTask(title, "todo"); //todo is included default because there is no dropdown option
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
placeholder="Enter Task"
value={title}
onChange={e => setTitle(e.target.value)}
/>
<button
onClick={handleSubmit}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Add Task
</button>
</div>
</div>
);
}
export default AddTaskModal;