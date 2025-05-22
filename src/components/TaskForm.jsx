import useTaskStore from '../store/useTaskStore';
import { useState } from 'react';

export default function TaskForm() {
  const [inputText, setInputText] = useState('');
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

    addTask(text);
    setInputText('');
  };

  /* 
  User skriver → onChange → handleChange → setInputText → React-state uppdateras → input.value ändras
  */

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputText}
        type='text'
        placeholder='Write a task'
        onChange={handleChange}
      />
      <button type='submit'>Task</button>
    </form>
  );
}
