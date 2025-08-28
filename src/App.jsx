import './components/todo/todo.css'
import TodoData from './components/todo/todoData'
import TodoNew from './components/todo/todoNew'
import reactLogo from './assets/react.svg'

const App = () => {
  const trong = "Trọng"
  const age = 18
  const data = {
    country: 'Việt Nam',
    city: 'Cần Thơ'
  }
  // {key: value}
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew/>
      <TodoData 
      name = {trong}
      age = {age}
      data = {data}
      />
      <div className='todo-img'>
        <img src={reactLogo} alt="" className='logo'/>
      </div>
    </div>
    
  )
}

export default App
