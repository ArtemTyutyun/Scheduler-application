import React, { useState, useEffect } from 'react';
import Input from './structure/Input';
import Calendar from './structure/Calendar';
import List from './structure/List';
import './styles/main.css'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name) => {
    const newTask = {
      id: Date.now(),
      name: name,
      date: selectedDate ? new Date(selectedDate) : null,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          name: newName,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredTasks = tasks.filter((task) => {
    if (!task.date) return false;
    const taskDate = new Date(task.date);
    return (
      taskDate.getDate() === selectedDate.getDate() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className='App-div'>
      <h1 className='h1-MyPlans'>My Plans</h1>
      <Input onSave={addTask} />
      <div className='calendar'>
      <Calendar selected={selectedDate} onChange={handleDateChange} />
      </div>
      <List tasks={filteredTasks} onDelete={deleteTask} onEdit={editTask} selectedDate={selectedDate} />
    </div>
  );
}

export default App;




