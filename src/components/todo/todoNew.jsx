import { useState } from "react"

const TodoNew = (props) => {

  // useState hook (getter/settet)
  // const valueInput = 0
  const [valueInput, setValueInput] = useState("Trọng")

  const {addNewToDo} = props
  // addNewToDo("Trọng")
  const handleClick = () =>{
    console.log(valueInput)
  }

  const handleOnChange = (name) =>{
    setValueInput(name)
  }
  return (
    <div className='todo-new'>
      <input type="text" placeholder='Enter your task' 
      onChange={(event) => handleOnChange(event.target.value)}/>
      <button style={{cursor:"pointer"}}
      onClick={handleClick}>Add</button>
      <div>My text input is: {valueInput}</div>
    </div>
  )
}

export default TodoNew