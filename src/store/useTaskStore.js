import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useTaskStore = create(
  devtools(
    persist(
      (set, get) => ({
        //STATE
        tasks: [],
        themeMode: 'light',

        //ACTIONS
        actions: {
          addTask: (text, dueDate) => {
            const trimmed = text.trim();
            if (trimmed === '') return;

            const dueDataObject = dueDate ? new Date(dueDate) : null;

            const newTask = {
              id: uuidv4(),
              text: trimmed,
              done: false,
              createdAt: new Date().toISOString(),
              dueDate: dueDataObject,
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

          toggleTheme: () =>
            set((state) => ({
              themeMode: state.themeMode === 'light' ? 'dark' : 'light',
            })),
        },

        //SELECTORS FÖR RÄKNARE
        selectors: {
          getTotalCount: () => get().tasks.length,
          getRemainingCount: () => get().tasks.filter((t) => !t.done).length,
          getCompletedCount: () => get().tasks.filter((t) => t.done).length,
        },
      }),
      {
        name: 'todo-storage', // nyckel i localStorage
        getStorage: () => localStorage, // default, men tydligt
        partialize: (state) => ({
          tasks: state.tasks, // vi sparar bara tasks-arrayen
        }),
      }
    ),
    { name: 'task-store' }
  )
);

export default useTaskStore;
