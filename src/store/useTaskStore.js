import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useTaskStore = create(
  devtools(
    (set, get) => ({
      //STATE
      tasks: [],

      //ACTIONS
      actions: {
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

        toggleTask: (id) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, done: !task.done } : task
            ),
          })),

        removeTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          })),

        clearCompleted: () =>
          set((state) => ({
            tasks: state.tasks.filter((task) => !task.done),
          })),
      },

      //SELECTORS
      selectors: {
        getTotalCount: () => get().tasks.length,
        getPendingCount: () => get().tasks.filter((t) => !t.done).length,
        getCompletedCount: () => get().tasks.filter((t) => t.done).length,
      },
    }),
    { name: 'task-store' }
  )
);

export default useTaskStore;
