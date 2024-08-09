import { useEffect } from "react";
import { useAuth } from "../store/Auth";

function FetchTodo({ setTasks }) {
  const { baseURL, token } = useAuth();

  useEffect(() => {
    async function fetchTasks() {
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
          console.log("Fetched tasks:", tasks);
          setTasks((prevTasks) => [...prevTasks, ...tasks]); // Append fetched tasks to existing state
        } else {
          console.error("Failed to fetch tasks.");
        }
      } catch (error) {
        console.error("Error while fetching tasks:", error);
      }
    }

    fetchTasks();
  }, [baseURL, token, setTasks]);

  return null;
}

export default FetchTodo;
