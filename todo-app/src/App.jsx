import AppName from "./Components/AppName";
import AddTodo from "./Components/AddTodo";
import TodoItems from "./Components/TodoItems";
import Message from "./Components/Message";
import { TodoContext } from "./store/todo-items-store";
import "./App.css";
import { useState } from "react";
function App() {
  const [NewItems, setItems] = useState([]);
  const handleItems = (Item, duedate) => {
    // two methods can be used like spread operator and functional updates on the basis of asynchronous working of reactjs.
    // const dynamicItems = [...NewItems, { name: Item, duedate: duedate }];
    // setItems(dynamicItems);

    setItems((NewItems) => [...NewItems, { name: Item, duedate: duedate }]);
  };

  const handleDeleteBtn = (ItemName) => {
    const deleteitems = NewItems.filter((item) => item.name !== ItemName);
    setItems(deleteitems);
  };
  return (
    <TodoContext.Provider>
      <center className="todo">
        <AppName></AppName>
        <AddTodo handleItems={handleItems}></AddTodo>
        <Message NewItems={NewItems}></Message>
        <TodoItems
          tasklist={NewItems}
          onDeleteClick={handleDeleteBtn}
        ></TodoItems>
      </center>
    </TodoContext.Provider>
  );
}
export default App;
