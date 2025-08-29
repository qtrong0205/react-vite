import { useState } from "react"

const TodoNew = (props) => {

  // useState hook (getter/settet)
  // const valueInput = 0
  const [valueInput, setValueInput] = useState("")

  const {addNewToDo} = props
  // addNewToDo("Trọng")
  const handleClick = () =>{
    addNewToDo(valueInput)
    setValueInput("")
  }

  const handleOnChange = (name) =>{
    setValueInput(name)
  }
  return (
    <div className='todo-new'>
      <input type="text" placeholder='Enter your task' 
      onChange={(event) => handleOnChange(event.target.value)}
      value={valueInput}/>
      <button className="add-btn" style={{cursor:"pointer"}}
      onClick={handleClick}>Add</button>
      <div>My text input is: {valueInput}</div>
    </div>
  )
}

export default TodoNew