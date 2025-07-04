import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/task-types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

interface InitialState {
  task: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  task: [
    {
      id: "1",
      title: "Finalize Q3 Report",
      description:
        "Compile all departmental data and finalize the quarterly financial report for stakeholder review.",
      dueDate: "2025-07-15",
      isCompleted: false,
      priority: "High",
    },
    {
      id: "2",
      title: "Design New UI Mockups",
      description:
        "Create mockups for the new user dashboard, focusing on usability and modern design principles.",
      dueDate: "2025-07-22",
      isCompleted: false,
      priority: "Medium",
    },
    {
      id: "3",
      title: "Fix Authentication Bug",
      description:
        "Investigate and resolve the intermittent login issue reported by users on the mobile app.",
      dueDate: "2025-07-06",
      isCompleted: true,
      priority: "High",
    },
    {
      id: "4",
      title: "Organize Team Outing",
      description:
        "Plan and coordinate a team-building event for the end of the month.",
      dueDate: "2025-07-30",
      isCompleted: false,
      priority: "Low",
    },
    {
      id: "5",
      title: "Update API Documentation",
      description:
        "Document the new endpoints and update existing sections to reflect the latest API changes.",
      dueDate: "2025-08-01",
      isCompleted: true,
      priority: "Medium",
    },
  ],
  filter: "all",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      // Ensure the new task has a unique ID
      const newTaskId =uuidv4();

      const newTask: ITask = {
        ...action.payload,
        id: newTaskId, // Assign the new ID
        isCompleted: false, // Default to not completed
      };
      state.task.push(newTask);
    },
  },
});

export const selectTasks = (state: RootState) => {
  return state.tasks.task;
};
export const selectFilter = (state: RootState) => {
  return state.tasks.filter;
};

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
