import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/main.css'; 

function Calendar({ selected, onChange }) {
    return (
      <div className='calendar'>
        <DatePicker 
          selected={selected} 
          onChange={onChange} 
          className='calendar-input'
        />
      </div>
    );
  }
  
  export default Calendar;
  