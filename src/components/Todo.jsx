import React, { useEffect, useRef, useState } from 'react';
import todoicon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
  const inputRef = useRef();

  const [todo, setTodo] = useState(() => {
    // Retrieve todos from localStorage and default to an empty array if not found
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // Save todos to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  const addTask = () => {
    const task = inputRef.current.value;
    const newTodo = {
      id: Date.now(),
      text: task,
      isCompleted: false,
    };
    if (task.trim()) {
      setTodo([...todo, newTodo]);
      inputRef.current.value = '';
    }
  };

  const deleteTodo = (id) => {
    setTodo(todo.filter((task) => task.id !== id));
  };

  const toogleComplete = (id) => {
    const updatedTodo = todo.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTodo(updatedTodo);
  };

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex gap-2'>
        <img src={todoicon} alt="Todo Icon" height={20} width={30} />
        <h1 className='text-2xl font-semibold'>To-do List</h1>
      </div>
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          type='text'
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          placeholder='Add your task'
        />
        <button onClick={addTask} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>
          Add +
        </button>
      </div>
      <div>
        {todo.length > 0 ? (
          todo.map((item) => (
            <TodoItems
              key={item.id}
              tasks={item.text}
              id={item.id}
              isCompleted={item.isCompleted}
              deleteTodo={deleteTodo}
              toogleComplete={toogleComplete}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks added yet!</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
