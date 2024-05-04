/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

const TaskInput = ({ addTask, updateTask, editedTask, setShowModal }) => {

  const initialState = {
    title: "",
    description: "",
    date: "",
    priority: "Medium",
    category: "",
  };

  const [task, setTask] = useState(initialState);

  useEffect(() => {
    if (editedTask) {
      setTask(editedTask);
    } else {
      setTask(initialState);
    }
  }, [editedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    const { title, description, date, priority, category } = task;
    if (
      !title.trim() ||
      !description.trim() ||
      !date.trim() ||
      !priority.trim() ||
      !category.trim()
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (editedTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
    setShowModal(false);
  };

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center">
      <Toaster position="top-center"  richColors />
      <div className="bg-purple-heart-950 p-8 rounded-lg md:w-9/12 sm:w-1/2 lg:w-1/2 text-purple-heart-200">
        <h2 className="text-2xl font-bold mb-4">
          {editedTask ? "Edit Task" : "Add New Task"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          className="w-full px-4 py-2 mb-4 border bg-transparent border-purple-heart-700 rounded focus:outline-none"
          value={task.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full px-4 py-2 mb-4 border bg-transparent border-purple-heart-700 rounded focus:outline-none"
          value={task.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="date"
          name="date"
          className="w-full px-4 py-2 mb-4 border bg-transparent border-purple-heart-700 rounded focus:outline-none"
          value={task.date}
          onChange={handleChange}
        />
        <select
          name="priority"
          className="w-full px-4 py-2 mb-4 border bg-transparent border-purple-heart-700 rounded focus:outline-none"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <select
          name="category"
          className="w-full px-4 py-2 mb-4 border bg-transparent border-purple-heart-700 rounded focus:outline-none"
          value={task.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-purple-heart-500 text-white rounded hover:bg-purple-heart-600 focus:outline-none mr-2 transition duration-300 ease-in-out"
            onClick={handleAddTask}
          >
            {editedTask ? "Update Task" : "Add Task"}
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
