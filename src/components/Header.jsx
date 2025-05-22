import React from 'react';
import useTaskStore from '../store/useTaskStore';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export default function Header() {
  const totalCount = useTaskStore((state) => state.selectors.getTotalCount());
  const clearCompleted = useTaskStore((state) => state.actions.clearCompleted);
  const notCompleted = useTaskStore((state) =>
    state.selectors.getRemainingCount()
  );

  const toggleTheme = useTaskStore((state) => state.actions.toggleTheme);
  const themeMode = useTaskStore((state) => state.themeMode);

  return (
    <HeaderContainer>
      <h1>My Zustand Todo App</h1>
      <p>Totalt: {totalCount} uppgifter</p>
      <p>Remaining: {notCompleted} uppgiofter</p>
      <button onClick={clearCompleted}>Rensa avklarade</button>
      <ToggleButton
        onClick={() => {
          console.log('Toggle clicked!'); // ← ska synas i konsolen
          toggleTheme();
        }}
      >
        {themeMode === 'light' ? 'Dark mode' : 'Light mode'}
      </ToggleButton>
    </HeaderContainer>
  );
}
