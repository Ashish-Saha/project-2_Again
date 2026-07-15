import { useState } from "react";
import Search from "./Search";
import TaskActions from "./TaskActions";
import TaskLists from "./TaskLists";
import TaskModal from "./TaskModal";

export default function Taskboard() {
  const initialTask = {
    id: crypto.randomUUID(),
    title: "Integration API",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["Web", "Python", "API"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([initialTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleCreateTask = (formData, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, formData]);
    } else {
      const update = tasks.map((item) => {
        if (item.id === formData.id) {
          return formData;
        } else {
          return item;
        }
      });
      setTasks(update);
      setTaskToUpdate(null)
    }

    setShowModal(false);
  };

  const handleEdit = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleDelete = (taskId)=>{
    const deletedTask = tasks.filter(item=>(
      item.id !== taskId
    ))

    setTasks(deletedTask)
  }

  return (
    <>
      <section className="mb-20" id="tasks">
        {showModal && (
          <TaskModal
            updateTask={taskToUpdate}
            onCloseModal={() => {
              setShowModal(false);
              setTaskToUpdate(null);
            }}
            onCreateTask={handleCreateTask}
          />
        )}
        <div className="container">
          <div className="p-2 flex justify-end">
            <Search />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions onAddClick={() => setShowModal(true)} />
            <TaskLists tasks={tasks} onEdit={handleEdit} onDelete={handleDelete}/>
          </div>
        </div>
      </section>
    </>
  );
}
