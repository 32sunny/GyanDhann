import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: '',
    status: 'Low',
    isComplete: false,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://gyandhann-2.onrender.com/todo/read');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
    }
  };

  const handleCreate = async () => {
    if (!updatedData.title) {
      setError('Title is required');
      return;
    }

    try {
      const response = await fetch('https://gyandhann-3.onrender.com/todo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setUpdatedData({ title: '', isComplete: false, status: 'Low' });
    
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://gyandhann-2.onrender.com/todo/delete/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleUpdate = async () => {
    if (!updatedData.title) {
      setError('Title is required');
      return;
    }

    try {
      const response = await fetch(`https://gyandhann-2.onrender.com/todo/update/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });


      const updatedTodo = await response.json();
      
   
      setTodos(todos.map((todo) => (todo._id === editingId ? { ...todo, ...updatedTodo } : todo)));

     
      setUpdatedData({ title: '', isComplete: false, status: 'Low' });
      setEditingId(null);
      window.location.reload();
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setUpdatedData({
      title: todo.title,
      status: todo.status,
      isComplete: todo.isComplete,
    });
  };

  return (
    <div>
      <h1>Todo List</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="text"
          name="title"
          placeholder="Enter todo title"
          value={updatedData.title}
          onChange={handleChange}
        />
        <select name="status" value={updatedData.status} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={editingId ? handleUpdate : handleCreate}>
          {editingId ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: '15px', border: '1px solid black', padding: '10px' }}>
            <div>
              <strong>{todo.title}</strong>
            </div>
            <div>Status: {todo.status}</div>
            <div>{todo.isComplete ? 'Completed' : 'Incomplete'}</div>
            <button onClick={() => handleEdit(todo)}>Update</button>
            <button onClick={() => handleDelete(todo._id)} style={{ color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
