import React, { useState } from 'react';
import Calendar from './Calendar';

function ParentComponent() {
    const [highlightedDates, setHighlightedDates] = useState([]);
  
    const handleAddPlan = (date) => {
      const updatedDates = [...highlightedDates, date];
      setHighlightedDates(updatedDates);
    };
  
    const handleRemovePlan = (date) => {
      const updatedDates = highlightedDates.filter((d) => d !== date);
      setHighlightedDates(updatedDates);
    };
  
    return (
      <div>
        <Calendar
          highlightedDates={highlightedDates}
          onAddPlan={handleAddPlan}
          onRemovePlan={handleRemovePlan}
        />
      </div>
    );
  }
  
  export default ParentComponent;
  