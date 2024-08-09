import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import ShowTodo from "./ShowTodo";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../store/Auth";

function Todo() {
  const { baseURL, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    todoName: "",
    lastDate: "",
  });

  const HandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/auth/createtodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        setTask({ todoName: "", lastDate: "" });
        fetchTasks();
      }
    } catch (error) {
      console.error("Error while adding task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${baseURL}/api/auth/fetchtodo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const tasks = await response.json();
        setTasks(tasks);
      } else {
        console.error("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error while fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [setTasks]);

  return (
    <>
      <Navbar />
      <div className="container mt-5 pb-5 px-3">
        <div
          className="border rounded bg-light"
          style={{ minHeight: "30rem", boxShadow: "0px 1px 10px" }}
        >
          <h1 className="text-center p-4 text-info">My To-Do List</h1>
          <form
            className="row g-3 justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="col-12 col-md-5">
              <input
                type="text"
                name="todoName"
                id="todoName"
                value={task.todoName}
                onChange={HandleInput}
                className="form-control"
                placeholder="Add a new task"
                required
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="date"
                name="lastDate"
                id="lastDate"
                required
                value={task.lastDate}
                onChange={HandleInput}
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-auto">
              <button className="btn btn-success w-100" type="submit">
                Add
              </button>
            </div>
            <div className="col-12 col-md-4">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search your todo"
                  className="form-control"
                />
                <span className="input-group-text bg-white border-none">
                  <CiSearch className="text-dark" size={20} />
                </span>
              </div>
            </div>
          </form>
          <ShowTodo tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Todo;
