import { useStorage } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { computed } from "vue";

export function useTasks() {
  const tasks = useStorage("tasks", []);

  const addTask = (title) => {
    tasks.value.push({
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    });
  };

  const debouncedAddTask = useDebounceFn(addTask, 500);

  const updateTask = (id, updates) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updates };
    }
  };

  const deleteTask = (id) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      tasks.value.splice(taskIndex, 1);
    }
  };

  const toggleTaskComplete = (id) => {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  };

  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.completed)
  );

  const pendingTasks = computed(() =>
    tasks.value.filter((task) => !task.completed)
  );

  return {
    tasks,
    addTask: debouncedAddTask,
    deleteTask,
    updateTask,
    toggleTaskComplete,
    completedTasks,
    pendingTasks,
  };
}
