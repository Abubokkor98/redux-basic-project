import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/task-types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  task: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  task: [
    {
      id: "wjdowjd",
      title: "initialize frontend",
      description: "create home page and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "High",
    },
  ],
  filter: "all",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const selectTasks = (state: RootState) => {
  return state.tasks.task;
};
export const selectFilter = (state: RootState) => {
  return state.tasks.filter;
};

export default taskSlice.reducer;
