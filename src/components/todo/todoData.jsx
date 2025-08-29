// cách code khác: const TodoData = ({name}) => {
// lấy ra biến name từ props luôn 

const TodoData = (props) => {
    // props là một biến object
    // destructuring object
    // const {name, age, data} = props
    console.log(props)
    return (
      <div className='todo-data'> 
        <div>Learning React</div>
        <div>Watch youtube</div>
        <div>{JSON.stringify(props.todoList)}</div>
      </div>
    )
}

export default TodoData