import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(todo.task);

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(todo.id, newTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCheckboxChange = () => {
    onUpdate(todo.id, todo.task, !todo.completed); // Toggle completed state
  };

  return (
    <div className="p-4 mb-4 bg-gold rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newTask}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleCheckboxChange}
              className="h-5 w-5 rounded-full border-2 border-gray-400 focus:ring-2 circular-checkbox "
            />
            <span
              className={`text-xl  ${
                todo.completed ? 'line-through text-green-500' : 'text-red-600'
              }`}
              onDoubleClick={handleDoubleClick}
            >
              {todo.task}
            </span>
          </div>
        )}
        <div>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none mx-3 hover:scale-110 transition-transform duration-300"
          >
            Delete
          </button>
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none hover:scale-110 transition-transform duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleDoubleClick}
              className="px-3 py-1 text-white bg-tail rounded hover:bg-yellow-600 focus:outline-none hover:scale-110 transition-transform duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
