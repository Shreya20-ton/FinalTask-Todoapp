import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import axios from "axios";
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  const addTodo = async (title) => {
    const res = await axios.post("http://localhost:5000/api/todos", { title });
    setTodos([...todos, res.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✨ ADD THIS FUNCTION FOR EDITING
  const editTodo = async (id, newTitle) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, { title: newTitle });
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <h1>My To-Do 🎀</h1>
      <AddTodo onAdd={addTodo} />

      {/* ✨ THIS IS WHERE YOU ADD IT */}
      <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
    </div>
  );
};

export default App;
