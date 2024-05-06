import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";

interface Task {
  id: number;
  name: string;
  email: string;
}

interface TaskInterfaceProps {
  backendName: string;
}

const TaskInterface: React.FC<TaskInterfaceProps> = ({ backendName }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ name: "", email: "" });
  const [updateTask, setUpdateTask] = useState({
    id: "",
    name: "",
    email: "",
  });

  // const backgroundColors: { [key: string]: string } = {
  //   flask: "bg-blue-500",
  // };

  // const buttonColors: { [key: string]: string } = {
  //   flask: "bg-blue-700 hover:bg-blue-600",
  // };

  // const bgColor =
  //   backgroundColors[backendName as keyof typeof backgroundColors] ||
  //   "bg-gray-200";

  // const btnColor =
  //   backgroundColors[backendName as keyof typeof backgroundColors] ||
  //   "bg-gray-500 hover:bg-gray-600";

  // fetch tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/${backendName}/tasks`);
        setTasks(response.data.reverse());
      } catch (error) {
        console.log("where'd it all go wrong: ", error);
      }
    };
    fetchData();
  }, [backendName, apiURL]);

  // create task
  const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiURL}/api/${backendName}/tasks`,
        newTask
      );
      setTasks([response.data, ...tasks]);
      setNewTask({ name: "", email: "" });
    } catch (error) {
      console.error("erro making task: ", error);
    }
  };

  // update task
  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiURL}/api/${backendName}/tasks/${updateTask.id}`, {
        name: updateTask.name,
        email: updateTask.email,
      });
      setUpdateTask({ id: "", name: "", email: "" });
      setTasks(
        tasks.map((task) => {
          if (task.id === parseInt(updateTask.id)) {
            return { ...task, name: updateTask.name, email: updateTask.email };
          }
          return task;
        })
      );
    } catch (error) {
      console.error("error updating task: ", error);
    }
  };

  // delete task
  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`${apiURL}/api/${backendName}/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("error deleting task: ", error);
    }
  };

  return (
    <div
      className="min-h-screen  p-8 rounded-lg shadow-lg bg-gradient-to-br from-navy-600 to-navy-800 text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #0052D4, #65C7F7, #9CECFB)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">
        {" "}
        Support Tickets Project Manager{" "}
      </h1>

      {/* create em */}
      <form onSubmit={createTask} className="mb-6">
        <input
          placeholder="Title"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="mb-2 p-2 rounded w-full text-black"
        />
        <input
          placeholder="Email"
          value={newTask.email}
          onChange={(e) => setNewTask({ ...newTask, email: e.target.value })}
          className="mb-2 p-2 rounded w-full text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Task
        </button>
      </form>

      {/* update em */}
      <form onSubmit={handleUpdateTask} className="mb-6">
        <input
          placeholder="Task Id"
          value={updateTask.id}
          onChange={(e) => setUpdateTask({ ...updateTask, id: e.target.value })}
          className="mb-2 p-2 rounded w-full text-black"
        />
        <input
          placeholder="Title"
          value={updateTask.name}
          onChange={(e) =>
            setUpdateTask({ ...updateTask, name: e.target.value })
          }
          className="mb-2 p-2 rounded w-full text-black"
        />
        <input
          placeholder="Dscription"
          value={updateTask.email}
          onChange={(e) =>
            setUpdateTask({ ...updateTask, email: e.target.value })
          }
          className="mb-2 p-2 rounded w-full text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Task
        </button>
      </form>

      {/* display em */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg p-4 shadow">
            <CardComponent card={task} />
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>

    // <div className="card">
    //   <h1>{backendName}</h1>
    //   <CardComponent card={{ id: 1, name: "John Doe", email: "mail" }} />
    // </div>
  );
};

export default TaskInterface;
