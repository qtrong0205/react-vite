import './components/todo/todo.css'
import TodoData from './components/todo/todoData'
import TodoNew from './components/todo/todoNew'
import reactLogo from './assets/react.svg'

const App = () => {
 

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew/>
      <TodoData/>
      <div className='todo-img'>
        <img src={reactLogo} alt="" className='logo'/>
      </div>
    </div>
    
  )
}

export default App
