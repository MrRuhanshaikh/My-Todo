import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const loadedTodos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : []; // new
  const [todos, setTodos] = useState(loadedTodos);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() === "") {
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isDone: false }]);
    setTodo("");
  };

  const handleChecked = (e) => {
    const id = e.target.name;
    const newTodo = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setTodos(newTodo);
  };

  const handleDelete = (id) => {
    const newTodo = todos.filter(item => item.id !== id);
    setTodos(newTodo);
  };

  const handleEdit = (id) => {
    const nT = todos.filter(i => i.id === id);
    setTodo(nT[0].todo); // single todo
    const newTodo = todos.filter(item => item.id !== id);
    setTodos(newTodo);
  };

  return (
    <>
      <Navbar />
      <div className="container sm:border sm:border-zinc-500 sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 mx-auto rounded-lg m-5 bg-slate-100">
        <div className="header border-b border-zinc-500 p-3">
          <div className="heading font-bold text-center text-xl">
            <h1>
              <span className="pb-1 border-b border-double border-slate-500">MyTodo App</span> - Organize and Achieve
            </h1>
          </div>
          <div className="addTodo space-y-3 mt-3">
            <div className="font-bold text-lg ml-2 sm:ml-0">Add a Todo</div>
            <div className="space-x-2 flex">
              <input
                type="text"
                name="addTodo"
                value={todo}
                onChange={handleChange}
                className="w-[90%] rounded-full py-1 px-3"
              />
              <span>
                <button
                  onClick={handleAdd}
                  className="py-1 px-3 rounded-full bg-slate-300 hover:bg-slate-400 transition-all 3s ease-in-out"
                >
                  Save
                </button>
              </span>
            </div>
            <div className="cursor-pointer space-x-2 flex">
              <input
                onChange={toggleFinished}
                type="checkbox"
                name="tick"
                checked={showFinished}
              />
              <span>Show Finished</span>
            </div>
          </div>
        </div>
        <div className="Tasks overflow-y-auto p-3 h-[80vh] sm:h-[60vh]">
          <div className="yourTodos font-bold text-lg">Your Todos</div>
          {todos.length === 0 && <div className='text-center'>Nothing to Display !!</div>}
          {todos.map((item) => {
            return (showFinished || !item.isDone) && (
              <div key={item.id} className="task mt-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer space-x-2">
                    <input
                      name={item.id}
                      type="checkbox"
                      onChange={handleChecked}
                      checked={item.isDone}
                    />
                    <div className={item.isDone ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="icons flex gap-1">
                    <div onClick={() => { handleEdit(item.id) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className=" cursor-pointer w-4 fill-current text-slate-500 transition-all 3s ease-in-out hover:text-black">
                      <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> </svg> </div>

                    <div onClick={() => { handleDelete(item.id) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className=" cursor-pointer w-4 fill-current text-slate-500 transition-all 3s ease-in-out hover:text-black">
                      <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
