import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import { useDispatch, useSelector } from "react-redux";
import { removeTasks, updatedTasks, addTasks } from "../store/to-do-slice";
import { Toaster, toast } from "sonner";
import Header from "../components/Header";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const MainContent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.todo);
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [weather, setWeather] = useState(null);

  const deleteTask = (id) => {
    dispatch(removeTasks(id));
    toast.success("Task deleted successfully");
  };
  const editTask = (id) => {
    const taskToEdit = items.find((task) => task.id === id);
    setEditedTask(taskToEdit);
    setShowModal(true);
  };

  const updateTask = (updatedTask) => {
    const updatedTasksList = items.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    dispatch(updatedTasks(updatedTasksList));
    setEditedTask(null);
    toast.success("Task updated successfully");
  };

  const addTask = (task) => {
    const id = new Date().getTime();
    dispatch(addTasks({ ...task, id }));
    setShowModal(false);
    toast.success("Task added successfully");
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          latitude || ""
        }&lon=${longitude || ""}&q=${
          latitude ? "" : "Patna"
        }&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeather(data);
    } catch (error) {
      toast.error("Error fetching weather:", error);
    }
  };

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          fetchWeather(position.coords.latitude, position.coords.longitude),
        (error) => {
          console.error("Error getting user location:", error);
          fetchWeather();
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      fetchWeather();
    }
  };

  useEffect(fetchUserLocation, []);

  return (
    <div>
      <Header
        onAddTask={() => {
          setShowModal(true);
          setEditedTask(null);
        }}
        onFetchUserLocation={fetchUserLocation}
      />
      <div className="container mx-auto py-8">
        <TaskList
          tasks={items}
          editTask={editTask}
          deleteTask={deleteTask}
          weather={weather}
        />
      </div>
      {showModal && (
        <TaskInput
          addTask={addTask}
          updateTask={updateTask}
          editedTask={editedTask}
          setShowModal={setShowModal}
        />
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default MainContent;
