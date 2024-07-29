import { GrNotes } from "react-icons/gr";
import { CiStar } from "react-icons/ci";
import { useState } from "react";
function ShowTodo({task,date}){
  const [star,setStar] = useState(false);
  const handleStar = ()=>{
    setStar(!star);
  }
  return (
  <>
  <div className="m-5  ">
  <div className=" d-flex justify-content-between  " >
    <div className="col-2">{task}</div>
    <div  style={{cursor:"pointer"}}> 
    <GrNotes size={25}/>
    </div>
    <div  style={{cursor:"pointer"}}>
    <CiStar size={30} onClick={handleStar}  style={{color : star ? "yellow" : "black"}}/>
    </div>
    <div>{date}</div>
    <div > <button className="btn btn-danger fs-5 "> Delete</button></div>
  </div>
  </div>
  </>
  )
}

export default ShowTodo;