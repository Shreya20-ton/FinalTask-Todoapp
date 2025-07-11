const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;

const DATA_FILE = "./data/todos.json";

app.use(cors());
app.use(express.json());

// ✅ GET all todos
app.get("/api/todos", (req, res) => {
  const todos = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(todos);
});

// ✅ POST a new todo
app.post("/api/todos", (req, res) => {
  const todos = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const newTodo = {
    id: Date.now().toString(),
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
  res.status(201).json(newTodo);
});

// ✅ DELETE a todo by ID
app.delete("/api/todos/:id", (req, res) => {
  let todos = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  todos = todos.filter(todo => todo.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
  res.json({ message: "Deleted successfully" });
});

// PUT: Update a todo by ID
app.put("/api/todos/:id", (req, res) => {
  const todos = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const updatedTodos = todos.map(todo => {
    if (todo.id === req.params.id) {
      return { ...todo, title: req.body.title };
    }
    return todo;
  });
  fs.writeFileSync(DATA_FILE, JSON.stringify(updatedTodos, null, 2));
  res.json({ message: "Todo updated successfully" });
});

// ✅ Root route to avoid 'Cannot GET /'
app.get("/", (req, res) => {
  res.send("✅ Backend is running! Use /api/todos to access the ToDo API.");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
