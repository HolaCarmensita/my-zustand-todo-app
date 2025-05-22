import React from 'react';
import useTaskStore from '../store/useTaskStore';

export default function Header() {
  const totalCount = useTaskStore((state) => state.selectors.getTotalCount());
  const clearCompleted = useTaskStore((state) => state.actions.clearCompleted);
  const notCompleted = useTaskStore((state) =>
    state.selectors.getRemainingCount()
  );

  return (
    <header>
      <h1>My Zustand Todo App</h1>
      <p>Totalt: {totalCount} uppgifter</p>
      <p>Remaining: {notCompleted} uppgiofter</p>
      <button onClick={clearCompleted}>Rensa avklarade</button>
    </header>
  );
}
