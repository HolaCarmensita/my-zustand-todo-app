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
    <form onSubmit={handleSubmit} style={{ padding: '20px', margin: '10px' }}>
      <label
        htmlFor='date-text-input'
        style={{ display: 'block', marginBottom: '15px' }}
      >
        Date (YYYY-MM-DD):
        <input
          id='date-text-input'
          type='text'
          value={textValue}
          onChange={handleTextChange}
          placeholder='YYYY-MM-DD'
          style={{
            padding: '12px',
            margin: '8px 0',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </label>
      <button
        type='button'
        onClick={toggleCalendar}
        style={{ padding: '12px 24px', margin: '8px 5px' }}
      >
        öppna kalender
      </button>
      <button type='submit' style={{ padding: '12px 24px', margin: '8px 5px' }}>
        välj datum
      </button>

      {showCalendar && (
        <label
          htmlFor='date-picker'
          style={{ display: 'block', marginTop: '15px', marginBottom: '15px' }}
        >
          Select Date:
          <input
            id='date-picker'
            type='date'
            value={dateValue}
            onChange={handleDateChange}
            style={{
              padding: '12px',
              margin: '8px 0',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </label>
      )}
    </form>
  );
}
