import './components/todo/todo.css'
import TodoData from './components/todo/todoData'
import TodoNew from './components/todo/todoNew'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {
  const [todoList, setTodo] = useState([
    {id: 1, name: "Learning React"},
    {id: 2, name: "Watching Youtube"}
  ])

  const trong = "Trọng"
  const age = 18
  const data = {
    country: 'Việt Nam',
    city: 'Cần Thơ'
  }

  const addNewToDo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }
    setTodo([...todoList, newTodo])
  }

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  // {key: value}
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
      addNewToDo = {addNewToDo}/>
      <TodoData 
      name = {trong}
      age = {age}
      data = {data}
      todoList = {todoList}
      />
      <div className='todo-img'>
        <img src={reactLogo} alt="" className='logo'/>
      </div>
    </div>
    
  )
}

export default App
