import { useState } from 'react';
import FilterBar from './FilterBar';
import TaskList from './TaskList';
import styled from 'styled-components';

export const TaskViewContainer = styled.div``;

export default function TaskView() {
  const [filter, setFilter] = useState('all');

  return (
    <TaskViewContainer>
      <FilterBar filterMode={filter} onChange={setFilter} />
      <TaskList filterMode={filter} />
    </TaskViewContainer>
  );
}
