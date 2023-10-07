"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching Todos:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('api/createTodo', {
        task: newTodo,
        completed: false,
      });
      setNewTodo('');
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error creating Todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/deleteTodo', {
        data: { id },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  const handleUpdate = async (id, updatedTask, completed) => {
    try {
      const response = await axios.put(`/api/updateTodo`, {
        id: id,
        task: updatedTask,
        completed: completed,
      });
  
      if (response.status === 200) {
      
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? response.data : todo
          )
        );
      } else {
        console.error('Error updating Todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating Todo:', error);
    }
  };
  return (
    <div className="container p-4 mx-auto text-center bg-teal h-screen">
    <h1 className="mb-4 text-6xl font-bold text-gold">TODO LIST</h1>
    <div className="flex items-center mb-4 space-x-2">
      <input
        type="text"
        placeholder="Add a new Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 "
      />
      <button
        onClick={handleCreate}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none hover:scale-110  transition-transform duration-300"
      >
        Add
      </button>
    </div>
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
      
    </div>
  </div>
  );
}
