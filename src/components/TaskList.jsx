import { useMemo } from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmtyState';
import { isToday, isThisWeek } from 'date-fns';
import useTaskStore from '../store/useTaskStore';

export default function TaskList({ filterMode }) {
  // 1) Prenumerera på råa tasks
  const allTasks = useTaskStore((state) => state.tasks);

  // 2) Derivera filteredTasks med useMemo (filteredTasks är en ny array som är en avledning (derivation) av allTasks utifrån något villkor (t.ex. “endast dagens tasks”).
  const filteredTasks = useMemo(() => {
    switch (filterMode) {
      case 'today':
        return allTasks.filter((task) => task.dueDate && isToday(task.dueDate));
      case 'week':
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

  // 3) Tom-lista-hantering
  if (filteredTasks.length === 0) {
    return <EmptyState text='Inga uppgifter att visa för valt filter' />;
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
