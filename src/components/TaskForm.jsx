import useTaskStore from '../store/useTaskStore';
import { useState } from 'react';

export default function TaskForm() {
  const [inputText, setInputText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const addTask = useTaskStore((state) => state.actions.addTask);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = inputText.trim();

    // 1) Ingen text alls?
    if (!text) {
      alert('Please enter a task');
      return;
    }

    // 2) För kort?
    if (text.length < 3) {
      alert('Task is too short (min 3 characters)');
      return;
    }

    // 3) För långt?
    if (text.length > 100) {
      alert('Task is too long (max 100 characters)');
      return;
    }

    addTask(text, dueDate);
    setInputText('');
    setDueDate('');
  };

  /* 
  User skriver → onChange → handleChange → setInputText → React-state uppdateras → input.value ändras
  */

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', margin: '10px' }}>
      <label
        htmlFor='task-input'
        style={{ display: 'block', marginBottom: '15px' }}
      >
        Task Description:
        <input
          id='task-input'
          value={inputText}
          type='text'
          placeholder='Write a task'
          onChange={handleChange}
          style={{
            padding: '12px',
            margin: '8px 0',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </label>
      <label
        htmlFor='due-date'
        style={{ display: 'block', marginBottom: '15px' }}
      >
        Due Date:
        <input
          id='due-date'
          type='date'
          value={dueDate} // en useState‐variabel, t.ex. [dueDate, setDueDate]
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]} // förhindra datum i det förflutna
          style={{
            padding: '12px',
            margin: '8px 0',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </label>
      <button type='submit' style={{ padding: '12px 24px', margin: '10px 0' }}>
        Add Task
      </button>
    </form>
  );
}
