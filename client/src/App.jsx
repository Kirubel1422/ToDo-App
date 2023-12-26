import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdDone, MdEdit } from "react-icons/md";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [pop, setPop] = useState(false);
  const [done, setDone] = useState(false);

  const BASE_URL = "http://localhost:3000/todo/";
  const task = useRef(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setTodos(response.data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTaskReq = async () => {
    try {
      const response = await axios.post(BASE_URL, {
        task: task.current.value,
      });
      setPop(!pop);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReq = async (id) => {
    try {
      const response = await axios.delete(BASE_URL + id);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const changeTask = async (id) => {
    const newTask = prompt("Set new task");
    try {
      const response = await axios.put(BASE_URL + id, {
        task: newTask,
        completed: false,
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const updateReq = async (id, isCompleted) => {
    try {
      const response = await axios.put(BASE_URL + id, {
        completed: !isCompleted,
      });
      if (response.status !== 200) {
        console.error(response.statusText);
        return;
      }
      setDone((prev) => !prev);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const addToDo = () => {
    return (
      <div
        className="absolute px-4 py-10 rounded-md w-96 bg-slate-700 text-slate-800 shadow-md shadow-slate-700 border-slate-300 border-2"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="text-center">
          <input
            type="text"
            className="bg-slate-200 placeholder:text-center border-2 outline-none border-slate-400 rounded-t-md p-2 focus:border-slate-600 w-full placeholder:uppercase placeholder:font-bold placeholder:animate-ping"
            placeholder="Write your todo"
            ref={task}
          />
          <br />
          <button
            className=" bg-slate-900 w-full border-transparent rounded-b-md py-2 text-white text-lg hover:bg-slate-800 transition-all duration-500 uppercase"
            onClick={addTaskReq}
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-16 md:px-96 relative h-svh transition-all duration-300 ease-out py-2 md:py-7 bg-slate-800">
      <h1 className="text-xl md:text-3xl text-slate-50 font-bold text-center">
        MERN TODO APP
      </h1>
      <div>
        {pop && addToDo()}

        <ul className="py-2 md:py-5">
          {todos.map((todo, index) => (
            <li
              className="flex justify-between items-center py-4 md:py-5 bg-slate-600 text-slate-100 my-1 px-1 md:px-3 border-transparent rounded-md"
              key={index}
            >
              <div
                className={`${todo.completed ? "line-through opacity-60" : ""}`}
              >
                {todo.task}
              </div>
              <div className="flex gap-3">
                <span
                  onClick={() => updateReq(todo._id, todo.completed)}
                  className="cursor-pointer"
                >
                  <MdDone />
                </span>
                <span
                  onClick={() => {
                    changeTask(todo._id);
                  }}
                  className="cursor-pointer"
                >
                  <MdEdit />
                </span>
                <span
                  onClick={() => deleteReq(todo._id)}
                  className="cursor-pointer"
                >
                  <RiDeleteBin6Fill />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center cursor-pointer">
        <span onClick={() => setPop(!pop)}>
          <IoIosAddCircleOutline size={50} color={"white"} />
        </span>
      </div>
    </div>
  );
};
export default App;
