import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai'




function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);

    }



  }, [])

  const toggleFinished = () => {
    setShowFinished(!showFinished)

  }


  const saveToLStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleDelete = (e, id) => {

    let index = todos.findIndex((item) => {
      return item.id === id
    })

    let newTodos = todos.filter((item) => {
      return item.id != id

    });
    setTodos(newTodos);
    saveToLStorage()

  }

  const handleEdit = (e, id) => {
    console.log(id);

    let Td = todos.filter((item) => {
      return item.id === id;

    })
    setTodo(Td[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id != id

    });
    setTodos(newTodos);
    saveToLStorage()

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    // console.log(todos)
    saveToLStorage()
  }

  const handleOnChange = (e) => {
    setTodo(e.target.value);

  }

  const handleCheckbox = (e) => {

    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id === id
    })

    console.log(id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos);
    // console.log(todos)
    saveToLStorage()


  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2 ">
        <h1 className='text-center font-bold text-xl'>Todo Application Designed using React ...</h1>
        <div className="addTodo flex flex-col gap-3 my-5">

          <h2 className="font-bold text-lg">Add a Todo</h2>
          <input className='w-full rounded-lg px-2 py-1' onChange={handleOnChange} value={todo} type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 3}
            className='font-bold text-sm bg-violet-700 hover:bg-violet-800 disabled:bg-violet-400 text-white cursor-pointer p-2 py-1 rounded-md  ' >add</button>
        </div>
        <input onChange={toggleFinished} type='checkbox' checked={showFinished} />Show Finished

        <h2 className='text-lg font-bold'>Your Todo's</h2>
        <div className="todos">

          {todos.length === 0 &&
            <div className="m-5 font-bold">
              No todos to display
            </div>
          }

          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.todo} className="todo flex md:w-2/3 my-3 justify-between ">

              <div className="flex gap-5" >
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="font-bold text-sm bg-violet-700 hover:bg-violet-800 text-white cursor-pointer p-2 py-1 rounded-md mx-3 "><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='font-bold text-sm bg-violet-700 hover:bg-violet-800 text-white cursor-pointer p-2 py-1 rounded-md '><AiFillDelete /></button>
              </div>

            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
