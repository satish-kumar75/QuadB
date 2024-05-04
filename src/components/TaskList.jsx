/* eslint-disable react/prop-types */
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
  FaRegCalendarAlt,
} from "react-icons/fa";

const TaskList = ({ tasks, editTask, deleteTask, weather }) => {
  const getWeatherIcon = (weatherDescription) => {
    switch (weatherDescription) {
      case "Clear Sky":
      case "Clear":
        return <FaSun size={20} color="yellow" />;
      case "Few Clouds":
      case "Scattered Clouds":
      case "Broken Clouds":
      case "Clouds":
        return <FaCloud size={20} color="grey" />;
      case "Shower Rain":
      case "Rain":
        return <FaCloudRain size={20} color="grey" />;
      case "Snow":
        return <FaSnowflake size={20} color="grey" />;
      case "Haze":
        return <FaSmog size={20} color="grey" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 hover:bg-red-600";
      case "Medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Low":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const sortedTasks = tasks
    .filter((task) => task !== null)
    .sort((a, b) => {
      if (a.priority === b.priority) {
        return 0;
      }
      if (a.priority === "High") {
        return -1;
      }
      if (b.priority === "High") {
        return 1;
      }
      if (a.priority === "Medium") {
        return -1;
      }
      return 1;
    });

  if (tasks.length === 0) {
    return <div className="text-center text-2xl mt-10">No tasks available</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-screen-xl m-auto sm:p-3 p-7">
      {sortedTasks.map((task, index) => (
        <div
          key={index}
          className="p-6 rounded-lg shadow-xl bg-purple-heart-950/50 border border-purple-heart-600 relative"
        >
          <div className="flex justify-between border-b border-purple-400 mb-4 pb-4">
            <div className="flex gap-4">
              <div className="w-28 sm:w-full">
                <p className="text-lg font-semibold mb-2">{task.title}</p>
                <p className="text-sm text-purple-heart-300 mb-2">
                  {task.description}
                </p>
              </div>
              <span
                className={`text-sm py-1 px-2 rounded-lg h-fit ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            </div>
            {task.category === "outdoor" && weather && (
              <div className="text-sm text-purple-heart-300 flex gap-2 items-center">
                {getWeatherIcon(weather.weather[0].main)}
                <div>
                  <p>{weather.weather[0].main}</p>
                  <p>{weather.main.temp}°C</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-purple-heart-300 flex items-center gap-3">
              <FaRegCalendarAlt />
              {task.date}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="text-purple-heart-500 hover:text-purple-heart-300 focus:outline-none"
                onClick={() => editTask(task.id)}
              >
                <RiEdit2Line size={20} />
              </button>
              <button
                className="text-red-500 hover:text-red-600 focus:outline-none"
                onClick={() => deleteTask(task.id)}
              >
                <RiDeleteBinLine size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
