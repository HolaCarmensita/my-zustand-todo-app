import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useTaskStore = create(
  devtools((set) => ({
    tasks: [],

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
        tasks: [newTask, ...state.tasks],
      }));
    },

    toggleTask: (id) => {
      set((state) => ({
        tasks: state.tasks.map((task) => {
          task.id === id ? { ...task, done: !task.done } : task;
          /* Om id matchar: du vill skapa en modifierad kopia av just den här tasken. Om id inte matchar någon stask: du vill låta den vara oförändrad.*/
        }),
      }));
    },
    removeTask: (id) => {},
    clearCompleted: () => {},
  }))
);

export default useTaskStore;
