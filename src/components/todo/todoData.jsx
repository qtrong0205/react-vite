// cách code khác: const TodoData = ({name}) => {
// lấy ra biến name từ props luôn 

const TodoData = (props) => {
    const {todoList} = props
    console.log(todoList)
    return (
      <div className='todo-data'> 
        {todoList.map((item, index) => {
          console.log(item, index)
          return (
          <div className="todo-item">
            <div>{item.name}</div>
            <button>Xoá</button>
          </div>)
        })}
        <div>{JSON.stringify(props.todoList)}</div>
      </div>
    )
}

export default TodoData