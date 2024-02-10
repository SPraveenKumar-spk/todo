import TodoItem from "./TodoItem";
function TodoItems({tasklist,onDeleteClick}) {
  return (
    <div className="items">
        {tasklist.map(tasks =>(<TodoItem  key ={ tasks.name} task = {tasks.name} dat={tasks.duedate} onDeleteClick = {onDeleteClick}></TodoItem>))}
    </div>
  );
}
export default TodoItems;
