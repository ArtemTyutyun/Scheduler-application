import React, { useState } from 'react';

function Input({ onSave }) {
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      saveTask();
    }
  };

  const saveTask = () => {
    if (taskName.trim() !== '') {
      onSave(taskName);
      setTaskName('');
    }
  };

  return (
    <div className="planEnter">
      <input
      className='planInput'
        type="text"
        placeholder="Enter task"
        value={taskName}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className='button' onClick={saveTask}>Add</button>
    </div>
  );
}

export default Input;