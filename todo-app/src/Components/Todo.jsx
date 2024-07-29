import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import ShowTodo from "./ShowTodo";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Todo(){
  const[add,setAdd] = useState([]);
  const [task,setTask] = useState({
    taskName: "",
    date : "",
  });

  const HandleInput = (e) =>{
    const name  = e.target.name;
    const value = e.target.value;
    setTask({...task,[name] : value});
   
  
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setAdd((prevState) => [...prevState,task]);
    setTask({
      taskName : "",
      date : "",
    })
  }

  console.log(add.taskName,add.date)
  return (
    <>
    <Navbar />
    <div className="container mt-5 pb-5">
    <div className="border rounded bg-light" style={{minHeight: "30rem", boxShadow: "0px 1px 10px"}}>
          <h1 className="text-center p-4 text-info">My To-Do List</h1>
          <form className="d-flex justify-content-center align-items-center gap-5" onSubmit={handleSubmit}>
            <input 
              type="text"
              name="taskName"
              id="taskName"
              value={task.taskName}
              onChange={HandleInput}
              className="form-control " 
              placeholder="Add a new task" 
              required
              style={{maxWidth: "500px"}}
            />
            <input type="date" name = "date" id = "date" required value={task.date} onChange={HandleInput} />
            <button className="btn btn-success fs-5" type = "submit" >Add</button>
            <div className="search-container">
            <input type="text" placeholder = "Search your todo" className=" p-1 search rounded border border-none border-3" /> <CiSearch className=" search-icon text-dark " size={20} />
            </div>
            </form>
          <div>
          {add.map((obj,index) =>(<ShowTodo task = {obj.taskName} date = {obj.date} key={index}/>))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Todo;