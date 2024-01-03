import { useState } from "react";
const itemStyle =
  "group-hover:w-[85%] min-h-12 bg-white rounded-sm p-2 my-2 w-full flex items-center justify-start group-hover:rounded-r-none hover:cursor-pointer select-none";
const itemStyleCompleted =
  "group-hover:w-[85%] min-h-12 bg-white rounded-sm p-2 my-2 w-full flex items-center justify-start group-hover:rounded-r-none line-through text-gray-400 hover:cursor-pointer select-none";
const TodoItem = ({ text, completed, id, deleteHandler, completedHandler }) => {
  const deleteHandler1 = () => {
    console.log("deleted: ", id);
    deleteHandler(id);
  };
  const toggleCompleted = () => {
    completedHandler(id);
  };
  return (
    <div className="group flex justify-center items-center">
      <div
        onClick={toggleCompleted}
        className={completed ? itemStyleCompleted : itemStyle}
      >
        {text}
      </div>
      <span
        onClick={deleteHandler1}
        className="select-none z-99 hidden text-white material-symbols-outlined w-[15%] bg-red-500
                 min-h-12 justify-center items-center rounded-r-sm group-hover:flex  hover:bg-red-800 hover:cursor-pointer"
      >
        delete
      </span>
    </div>
  );
};

export default TodoItem;
