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
      <p>{task.text}</p>
      <label>
        <input
          type='checkbox'
          checked={task.done}
          onChange={handleToggle}
        ></input>
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
