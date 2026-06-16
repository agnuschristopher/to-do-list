import { useState } from 'react';
import './App.css';

function App() {
  // State 1: An array that stores all our task objects
  const [tasks, setTasks] = useState([]);
  
  // State 2: A string that holds whatever text is currently typed in the input box
  const [inputValue, setInputValue] = useState('');

  // FEATURE 1: Adding a new task
  const addTask = () => {
    if (inputValue.trim() === '') return; // Prevents empty tasks

    const newTask = {
      id: Date.now(),          // Unique ID using the timestamp
      text: inputValue,        // The text typed by the user
      completed: false         // Starts out unchecked
    };

    setTasks([...tasks, newTask]); // Append new task to the array
    setInputValue('');             // Clear out the input bar
  };

  // FEATURE 2: Deleting a task
  const deleteTask = (idToDelete) => {
    // Keep only the tasks that DO NOT match the clicked ID
    const updatedTasks = tasks.filter(task => task.id !== idToDelete);
    setTasks(updatedTasks);
  };

  // FEATURE 3: Marking a task as done
  const toggleComplete = (idToToggle) => {
    // Loop through tasks, find the matching ID, and flip its 'completed' status
    const updatedTasks = tasks.map(task => {
      if (task.id === idToToggle) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#646cff' }}>📝 React To-Do List</h2>
      
      {/* Input Form Section */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Sync input bar with state
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: '#fff', color: '#000' }}
        />
        <button 
          onClick={addTask}
          style={{ padding: '10px 20px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Add
        </button>
      </div>

      {/* Interactive List Display Section */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No tasks yet. Add one above!</p>
        ) : (
          tasks.map(task => (
            <li 
              key={task.id} 
              style={{ 
                padding: '12px', 
                borderBottom: '1px solid #eee', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: task.completed ? '#f0f0f0' : 'transparent',
                borderRadius: '4px',
                marginBottom: '5px'
              }}
            >
              {/* Click text to toggle complete status */}
              <span 
                onClick={() => toggleComplete(task.id)}
                style={{ 
                  cursor: 'pointer', 
                  flex: 1,
                  textAlign: 'left',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#888' : '#fff'
                }}
              >
                {task.text}
              </span>
              
              {/* Button to delete task */}
              <button 
                onClick={() => deleteTask(task.id)}
                style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', marginLeft: '10px' }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;