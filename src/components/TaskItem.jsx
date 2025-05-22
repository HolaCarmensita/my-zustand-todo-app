import useTaskStore from '../store/useTaskStore';

export default function TaskItem({ task }) {
  const toggleTask = useTaskStore((state) => state.actions.toggleTask);
  const removeTask = useTaskStore((state) => state.actions.removeTask);

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleRemove = () => {
    removeTask(task.id);
  };

  return (
    <li>
      <label htmlFor={`task-${task.id}`}>
        <input
          id={`task-${task.id}`} //for conneting to the label
          type='checkbox'
          checked={task.done}
          onChange={handleToggle}
        ></input>
        <span>{task.text}</span>
      </label>
      <button
        type='button'
        onClick={handleRemove}
        aria-label={`Remove task ${task.text}`}
      >
        🗑️
      </button>
    </li>
  );
}
