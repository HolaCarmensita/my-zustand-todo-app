import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useTaskStore = create(
  devtools(
    (set) => ({
      // STATE
      tasks: [],

      // ADD TASK
      addTask: (text) => {
        const trimmed = text.trim();
        if (trimmed === '') return;
        const newTask = {
          id: uuidv4(),
          text: trimmed,
          done: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },

      // TOGGLE TASK
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
          ),
        })),

      // REMOVE TASK
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      // CLEAR COMPLETED TASKS
      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.done === false),
        })),
    }),
    { name: 'task-store' }
  )
);

export default useTaskStore;
