import { MdDeleteSweep } from "react-icons/md";
function TodoItem({task,dat,onDeleteClick}) {
  return (
    <div className="container">
      <div className="row new-row">
         <div className="col-4">{task}</div>
        <div className="col-4">{dat}</div>
        <div className="col-2">
          <button type="button" className="btn btn-danger new-button" onClick={()=> onDeleteClick(task)}>
          <MdDeleteSweep />
          </button>
        </div>
      </div>
    </div>
  );
}
export default TodoItem;
