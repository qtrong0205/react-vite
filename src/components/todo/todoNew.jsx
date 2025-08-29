const TodoNew = (props) => {
  const {addNewToDo} = props
  // addNewToDo("Trọng")
  const handleClick = () =>{
    alert("Click me")
  }

  const handleOnChange = (name) =>{
    console.log(name)
  }
  return (
    <div className='todo-new'>
      <input type="text" placeholder='Enter your task' 
      onChange={(event) => handleOnChange(event.target.value)}/>
      <button style={{cursor:"pointer"}}
      onClick={handleClick}>Add</button>
    </div>
  )
}

export default TodoNew