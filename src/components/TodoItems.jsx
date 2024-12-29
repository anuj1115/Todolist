import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'


const TodoItems = ({tasks, id, isCompleted, deleteTodo, toogleComplete}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>{toogleComplete(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img src={isCompleted ? tick : not_tick} alt='tick-icon' className='w-7'/>
            <p className={`text-slate-700 ml-4 decoration-slate-500 text-[17px] ${isCompleted ? "line-through" : ""}`}>{tasks}</p>
        </div>
        <img onClick={()=>deleteTodo(id)} src={delete_icon} alt='delete-icon' className='w-4'/>
    </div>
  )
}

export default TodoItems