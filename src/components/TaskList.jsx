import { useMemo } from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmtyState';
import { isToday, isThisWeek } from 'date-fns';
import useTaskStore from '../store/useTaskStore';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  #checklist {
    --background: #303952;
    --text: #5d6474;
    --check: #cc29f0;
    --disabled: #d3c8de;
    --width: 100px;
    --height: 180px;
    --border-radius: 10px;
    background: var(--background);
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    position: relative;
    box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
    padding: 30px 85px;
    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;
    justify-content: center;
  }

  #checklist label {
    color: var(--text);
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: fit-content;
    transition: color 0.3s ease;
    margin-right: 20px;
  }

  #checklist label::before,
  #checklist label::after {
    content: '';
    position: absolute;
  }

  #checklist label::before {
    height: 2px;
    width: 8px;
    left: -27px;
    background: var(--check);
    border-radius: 2px;
    transition: background 0.3s ease;
  }

  #checklist label:after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
  }

  #checklist input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    outline: none;
    border: 0;
    margin: 0 15px 0 0;
    cursor: pointer;
    background: var(--background);
    display: grid;
    align-items: center;
    margin-right: 20px;
  }

  #checklist input[type='checkbox']::before,
  #checklist input[type='checkbox']::after {
    content: '';
    position: absolute;
    height: 2px;
    top: auto;
    background: var(--check);
    border-radius: 2px;
  }

  #checklist input[type='checkbox']::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
  }

  #checklist input[type='checkbox']::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
  }

  #checklist input[type='checkbox']:checked::before {
    animation: check-01 0.4s ease forwards;
  }

  #checklist input[type='checkbox']:checked::after {
    animation: check-02 0.4s ease forwards;
  }

  #checklist input[type='checkbox']:checked + label {
    color: var(--disabled);
    animation: move 0.3s ease 0.1s forwards;
  }

  #checklist input[type='checkbox']:checked + label::before {
    background: var(--disabled);
    animation: slice 0.4s ease forwards;
  }

  #checklist input[type='checkbox']:checked + label::after {
    animation: firework 0.5s ease forwards 0.1s;
  }

  @keyframes move {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }

    100% {
      padding-right: 4px;
    }
  }

  @keyframes slice {
    60% {
      width: 100%;
      left: 4px;
    }

    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }

  @keyframes check-01 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }

    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }

    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }

    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }

  @keyframes check-02 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }

    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }

    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }

    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }

  @keyframes firework {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0,
        0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0;
    }

    30% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0,
        14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0,
        -14px -8px 0 0px #4f29f0;
    }
  }
`;

export default function TaskList({ filterMode }) {
  // 1) Prenumerera på råa tasks
  const allTasks = useTaskStore((state) => state.tasks);

  // 2) Derivera filteredTasks med useMemo (filteredTasks är en ny array som är en avledning (derivation) av allTasks utifrån något villkor (t.ex. “endast dagens tasks”).
  const filteredTasks = useMemo(() => {
    switch (filterMode) {
      case 'all':
        return allTasks;
      case 'today':
        return allTasks.filter((task) => task.dueDate && isToday(task.dueDate));
      case 'weekly':
        return allTasks.filter(
          (task) =>
            task.dueDate && isThisWeek(task.dueDate, { weekStartsOn: 1 })
        );
      case 'remaining':
        return allTasks.filter((task) => !task.done);
      case 'completed':
        return allTasks.filter((task) => task.done);
      default: // "all"
        return allTasks;
    }
  }, [allTasks, filterMode]);

  const total = filteredTasks.length;
  const completed = filteredTasks.filter((t) => t.done).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  // 3) Tom-lista-hantering
  if (filteredTasks.length === 0) {
    return <EmptyState text='Inga uppgifter att visa för valt filter' />;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ flexGrow: 1, mr: 2 }}>
          <LinearProgress variant='determinate' value={percent} />
        </Box>
        <Typography variant='body2' color='text.secondary'>
          {percent}%
        </Typography>
      </Box>

      <ul id='checklist'>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
}

// ul, li, input > label
