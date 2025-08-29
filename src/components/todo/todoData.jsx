// cách code khác: const TodoData = ({name}) => {
// lấy ra biến name từ props luôn 

const TodoData = (props) => {
    const {todoList} = props
    return (
      <div className='todo-data'> 
        {todoList.map((item, index) => {
          console.log(item, index)
          return (
          <div className= {`todo-item ${index}`} key  = {item.id}>
            <div>{item.name}</div>
            <button>Xoá</button>
          </div>
          )
        })}
      </div>
    )
}

export default TodoData