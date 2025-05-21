import React from 'react';
import useTaskStore from '../store/useTaskStore';

export default function Header() {
  const totalCount = useTaskStore((state) => state.selectors.getTotalCount());
  const clearCompleted = useTaskStore((state) => state.actions.clearCompleted);

  return (
    <header
      style={{ padding: '1rem', background: '#f5f5f5', textAlign: 'center' }}
    >
      <h1>My Zustand Todo App</h1>
      <p>Totalt: {totalCount} uppgift(er)</p>
      <button onClick={clearCompleted}>Rensa avklarade</button>
    </header>
  );
}
