import React, { useState } from 'react';

export default function DateInputWithPicker() {
  const [textValue, setTextValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleDateChange = (e) => {
    const val = e.target.value; // "2025-05-22"
    setDateValue(val);
    setTextValue(val);
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datum skickas vidare:', textValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={textValue}
        onChange={handleTextChange}
        placeholder='YYYY-MM-DD'
      />
      <button type='button' onClick={toggleCalendar}>
        öppna kalender
      </button>
      <button type='submit'>välj datum</button>

      {showCalendar && (
        <input type='date' value={dateValue} onChange={handleDateChange} />
      )}
    </form>
  );
}
