import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/task-types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

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

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
  return {
    id: nanoid(),
    isCompleted: false,
    ...taskData,
  };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      const newTask = createTask(action.payload);
      state.task.push(newTask);
    },
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.task.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },
    deleteTask:(state, action:PayloadAction<string>)=>{
      state.task= state.task.filter(task=>task.id!==action.payload)
    }
  },
});

export const selectTasks = (state: RootState) => {
  return state.tasks.task;
};
export const selectFilter = (state: RootState) => {
  return state.tasks.filter;
};

export const { addTask , toggleCompleteState,deleteTask} = taskSlice.actions;

export default taskSlice.reducer;
