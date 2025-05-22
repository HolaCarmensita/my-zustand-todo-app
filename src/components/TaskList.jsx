import useTaskStore from '../store/useTaskStore';
import TaskItem from './TaskItem';
import EmptyState from './EmtyState';

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);

  if (tasks === 0) {
    return (
      <EmptyState
        text={'Inga uppgifter än – lägg till din första!'}
      ></EmptyState>
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
