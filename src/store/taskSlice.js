import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage safely
const loadFromStorage = (key) => {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null || stored === "undefined") return [];
    return JSON.parse(stored);
  } catch (error) {
    console.warn(`Error loading ${key} from localStorage:`, error);
    return [];
  }
};

// Save to localStorage safely
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Error saving ${key} to localStorage:`, error);
  }
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadFromStorage("tasks"),
    favoriteTasks: loadFromStorage("favoriteTasks"), // Consistent naming
    completedTasks: loadFromStorage("completedTasks"),
  },

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveToStorage("tasks", state.tasks);
    },

    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      state.favoriteTasks = state.favoriteTasks.filter(
        (task) => task.id !== taskId
      );
      state.completedTasks = state.completedTasks.filter(
        (task) => task.id !== taskId
      );

      ["tasks", "favoriteTasks", "completedTasks"].forEach((key) =>
        saveToStorage(key, state[key])
      );
    },

    toggleFavorite: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.isFavorite = !task.isFavorite;
        state.favoriteTasks = task.isFavorite
          ? [...state.favoriteTasks, task]
          : state.favoriteTasks.filter((favTask) => favTask.id !== taskId);

        saveToStorage("tasks", state.tasks);
        saveToStorage("favoriteTasks", state.favoriteTasks);
      }
    },

    toggleComplete: (state, action) => {
      const taskId = action.payload;

      // Check if task is in active tasks
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        // Move to completedTasks
        const completedTask = state.tasks.splice(taskIndex, 1)[0];
        state.favoriteTasks = state.favoriteTasks.filter(
          (task) => task.id !== taskId
        );
        state.completedTasks.push(completedTask);
      } else {
        // Check in completedTasks to restore
        const completedIndex = state.completedTasks.findIndex(
          (task) => task.id === taskId
        );
        if (completedIndex !== -1) {
          // Restore to active tasks
          const restoredTask = state.completedTasks.splice(
            completedIndex,
            1
          )[0];
          state.tasks.push(restoredTask);
        }
      }

      ["tasks", "favoriteTasks", "completedTasks"].forEach((key) =>
        saveToStorage(key, state[key])
      );
    },
  },
});

export const { addTask, deleteTask, toggleFavorite, toggleComplete } =
  taskSlice.actions;
export default taskSlice.reducer;
