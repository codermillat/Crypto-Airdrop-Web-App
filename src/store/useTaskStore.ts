import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
  reward: number;
  icon: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  completeTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  completeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      ),
    })),
}));