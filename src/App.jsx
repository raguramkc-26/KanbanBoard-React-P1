import KanbanBoard from "./Components/KanbanBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <KanbanBoard />
      <ToastContainer />
    </div>
  );
}
export default App;
