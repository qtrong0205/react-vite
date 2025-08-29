import './components/todo/todo.css'
import TodoData from './components/todo/todoData'
import TodoNew from './components/todo/todoNew'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {
  const [todoList, setTodo] = useState([
    // {id: 1, name: "Learning React"},
    // {id: 2, name: "Watching Youtube"}
  ])

  const addNewToDo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }
    setTodo([...todoList, newTodo])
  }

  const deleteToDo = (id) => {
    const newTodo = todoList.filter((item) => item.id !== id)
    setTodo(newTodo)
  }

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // {key: value}
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewToDo={addNewToDo} />

      {todoList.length > 0
        ?
        <TodoData
          todoList={todoList}
          deleteToDo={deleteToDo}
        />
        :
        <div className='todo-img'>
          <img src={reactLogo} alt="" className='logo' />
        </div>
      }
    </div>

  )
}

export default App
