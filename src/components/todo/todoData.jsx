// cách code khác: const TodoData = ({name}) => {
// lấy ra biến name từ props luôn 

const TodoData = (props) => {
  const { todoList, deleteToDo } = props

  const handleClick = (id) => {
    deleteToDo(id)
  }

  return (
    <div className='todo-data'>
      {todoList.map((item, index) => {
        return (
          <div className={`todo-item ${index}`} key={item.id}>
            <div>{item.name}</div>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(item.id)}
            >Xoá</button>
          </div>
        )
      })}
    </div>
  )
}

export default TodoData