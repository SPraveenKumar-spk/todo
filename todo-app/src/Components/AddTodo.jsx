import { useRef } from "react";
import { IoIosAddCircle } from "react-icons/io";
function AddTodo({ handleItems }) {
  // const [addName, setName] = useState("");
  // const [addDate, setDate] = useState("");
  const nameref = useRef();
  const dateref = useRef();

  // const nameref = useRef(0);
  // const handleName = (event) => {
  //   setName(event.target.value);
  //   nameref.current += 1;
  // };
  // const handledueDate = (event) => {
  //   setDate(event.target.value);
  //   console.log(`updates are : ${nameref.current}`);
  // };
  const AddBtn = () => {
    if (
      nameref.current.value.trim() != "" &&
      dateref.current.value.trim() != ""
    ) {
      event.preventDefault();
      const addName = nameref.current.value;
      const addDate = dateref.current.value;
      nameref.current.value = "";
      dateref.current.value = "";
      handleItems(addName, addDate);
    } else {
      alert("Please fill all the input fields..");
    }
  };
  return (
    <div className="container">
      <form className="row new-row" onSubmit={AddBtn}>
        <div className="col-4">
          <input
            type="text"
            ref={nameref}
            placeholder="Enter the task"
            // value={addName}
            // onChange={handleName}
          ></input>
        </div>
        <div className="col-4">
          <input
            type="date"
            ref={dateref}
            // value={addDate}
            // onChange={handledueDate}
          ></input>
        </div>
        <div className="col-2">
          <button className="btn btn-success new-button">
            <IoIosAddCircle />
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddTodo;
