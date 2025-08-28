// cách code khác: const TodoData = ({name}) => {
// lấy ra biến name từ props luôn 

const TodoData = (props) => {
    // props là một biến object
    // destructuring object
    const {name, age, data} = props
    return (
      <div className='todo-data'> 
        <div>Learning React</div>
        <div>Watch youtube</div>
        <div>My name is {name}</div>
        <div>My hometown is {data.city}</div>
      </div>
    )
}

export default TodoData