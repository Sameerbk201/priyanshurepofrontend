import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/'+ "getalltodo"
      );
      // console.log(response.data.message)
      setTodos(response.data.message);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = async () => {
    try {
      const newTodo = { title, description };
      if (!title || !description) throw new Error("all fields required");
      await axios.post("http://localhost:5000/createtodo", {
        title,
        description,
      });
      fetchTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo", error);
      return alert(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos?.map((todo) => (
          <li key={todo._id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
