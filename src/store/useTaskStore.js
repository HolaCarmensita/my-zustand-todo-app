import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useTaskStore = create(
  devtools((set) => ({
    task: [],

    AddTask: (text) => {
      const trimmedText = text.trim();
      if (trimmedText === '') return;

      //add a task
      const newTask = {
        id: uuidv4(),
        text: trimmedText,
        done: false,
        createdAt: new Date().toISOString(),
      };

      // mutera state
      set((state) => ({
        task: [...state.task, newTask],
      }));
    },

    toggleTask: (id) => {},
    removeTask: (id) => {},
    clearCompleted: () => {},
  }))
);

export default useTaskStore;
