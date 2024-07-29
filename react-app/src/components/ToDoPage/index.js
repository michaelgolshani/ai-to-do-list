import React, { useState, useRef } from 'react';
import './ToDoPage.css';

function ToDoPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const taskListRef = useRef(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    setTimeout(() => {
      e.target.style.display = 'none';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.display = 'flex';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData('text/plain'));
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(sourceIndex, 1);
    newTasks.splice(targetIndex, 0, removed);
    setTasks(newTasks);
  };

  return (
    <div id="app">
      <h1>Todo List</h1>
      <div id="new-task-container">
        <input
          type="text"
          id="new-task"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id="add-task" onClick={addTask}>+</button>
      </div>
      <ul id="task-list" ref={taskListRef}>
        {tasks.map((task, index) => (
          <li
            key={index}
            className="task-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <span>{task}</span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoPage;
