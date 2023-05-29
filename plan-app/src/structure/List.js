import React, { useState } from 'react';
import '../styles/main.css';

function List({ tasks, onDelete, onEdit, selectedDate }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState('');
  
    const handleEditClick = (taskId, taskName) => {
      setEditingTaskId(taskId);
      setEditedTaskName(taskName);
    };
  
    const handleSaveClick = (taskId) => {
      onEdit(taskId, editedTaskName);
      setEditingTaskId(null);
    };
  
    return (
      <div className='plans-of-list'>
        {tasks.length > 0 ? (
          <>
            <h2 className='date-header'>{selectedDate.toLocaleDateString()}</h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {editingTaskId === task.id ? (
                    <>
                      <input
                        type='text'
                        value={editedTaskName}
                        onChange={(e) => setEditedTaskName(e.target.value)}
                      />
                      <button className='save' onClick={() => handleSaveClick(task.id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <span className='task'>{task.name}</span>
                      <div>
                        <button className='delete' onClick={() => onDelete(task.id)}>Delete</button>
                        <button className='edit' onClick={() => handleEditClick(task.id, task.name)}>Edit</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className='list'>No tasks for the selected date.</p>
        )}
      </div>
    );
  }
  
  export default List;
  