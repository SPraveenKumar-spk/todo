import { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useAuth } from "../store/Auth";

function ShowTodo({ tasks, setTasks }) {
  const { baseURL } = useAuth();
  const [descriptionFlag, setDescriptionFlag] = useState("");
  const [description, setDescription] = useState("");

  const handleStar = async (todoId, currentStar) => {
    const newStar = !currentStar;
    await updateTodoItem(todoId, { bookmark: newStar });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === todoId ? { ...task, bookmark: newStar } : task
      )
    );
  };

  const handleOpenModal = (desc, id) => {
    setDescription(desc);
    setDescriptionFlag(id);
  };

  const handleCloseModal = () => {
    setDescriptionFlag(""); // Close the modal
  };

  const handleSaveDescription = async (todoId) => {
    await updateTodoItem(todoId, { description });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === todoId ? { ...task, description } : task
      )
    );
    setDescriptionFlag("");
  };

  const handleDeleteDescription = async (todoId) => {
    setDescription("");
    await updateTodoItem(todoId, { description: "" });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === todoId ? { ...task, description: "" } : task
      )
    );
    setDescriptionFlag("");
  };

  const updateTodoItem = async (todoId, updates) => {
    try {
      const response = await fetch(`${baseURL}/api/auth/updatetodo/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error while updating task:", error);
    }
  };

  const handleDeleteTask = async (todoId) => {
    try {
      const response = await fetch(`${baseURL}/api/auth/deletetodo/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== todoId)
        );
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error while deleting task:", error);
    }
  };

  return (
    <div className="m-3">
      {tasks.length === 0 ? (
        <div className="text-center">
          <h2>No todo.. Create one</h2>
        </div>
      ) : (
        tasks.map(
          ({
            _id,
            todoName,
            lastDate,
            description: taskDescription,
            bookmark,
          }) => (
            <div key={_id} className="mb-4 p-3 border rounded shadow-sm">
              <div className="row align-items-center">
                <div className="col-12 col-md-4 col-lg-3 mb-2 mb-md-0">
                  <strong>{todoName}</strong>
                </div>
                <div className="col-12 col-md-2 col-lg-1 mb-2 mb-md-0 text-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleOpenModal(taskDescription, _id)}
                  >
                    <GrNotes title="Add description" size={25} />
                  </button>
                </div>
                <div className="col-12 col-md-2 col-lg-2 mb-2 mb-md-0 text-center">
                  <div style={{ cursor: "pointer" }}>
                    {bookmark ? (
                      <FaStar
                        size={30}
                        onClick={() => handleStar(_id, bookmark)}
                        title="Bookmark it"
                        style={{ color: "yellow" }}
                      />
                    ) : (
                      <CiStar
                        size={30}
                        onClick={() => handleStar(_id, bookmark)}
                        title="Bookmark it"
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-3 col-lg-3 mb-2 mb-md-0 text-center">
                  {lastDate}
                </div>
                <div className="col-12 col-md-1 col-lg-3 text-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTask(_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {descriptionFlag === _id && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">About task</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={handleCloseModal}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <textarea
                          className="form-control"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Add a description..."
                          rows="10"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCloseModal}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleSaveDescription(_id)}
                        >
                          Save changes
                        </button>
                        {description && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteDescription(_id)}
                          >
                            Delete Description
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )
      )}
    </div>
  );
}

export default ShowTodo;
