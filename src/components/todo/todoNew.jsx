const TodoNew = (props) => {
  const {addNewToDo} = props
  // addNewToDo("Trọng")
    return (
      <div className='todo-new'>
        <input type="text" placeholder='Enter your task' />
        <button>Add</button>
      </div>
    )
}

export default TodoNew