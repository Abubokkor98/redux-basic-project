import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/task-types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { removeUser } from "../users/userSlice";

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
      assignedTo: "1",
    },
    {
      id: "2",
      title: "Design New UI Mockups",
      description:
        "Create mockups for the new user dashboard, focusing on usability and modern design principles.",
      dueDate: "2025-07-22",
      isCompleted: false,
      priority: "Medium",
      assignedTo: null,
    },
    {
      id: "3",
      title: "Fix Authentication Bug",
      description:
        "Investigate and resolve the intermittent login issue reported by users on the mobile app.",
      dueDate: "2025-07-06",
      isCompleted: true,
      priority: "High",
      assignedTo: "2",
    },
    {
      id: "4",
      title: "Organize Team Outing",
      description:
        "Plan and coordinate a team-building event for the end of the month.",
      dueDate: "2025-07-30",
      isCompleted: false,
      priority: "Low",
      assignedTo: null,
    },
    {
      id: "5",
      title: "Update API Documentation",
      description:
        "Document the new endpoints and update existing sections to reflect the latest API changes.",
      dueDate: "2025-08-01",
      isCompleted: true,
      priority: "Medium",
      assignedTo: null,
    },
  ],
  filter: "all",
};

type DraftTask = Pick<
  ITask,
  "title" | "description" | "dueDate" | "priority" | "assignedTo"
>;

const createTask = (taskData: DraftTask): ITask => {
  return {
    ...taskData,
    id: nanoid(),
    isCompleted: false,
    assignedTo: taskData.assignedTo ? taskData.assignedTo : null,
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
    deleteTask: (state, action: PayloadAction<string>) => {
      state.task = state.task.filter((task) => task.id !== action.payload);
    },
    filterTask: (
      state,
      action: PayloadAction<"all" | "high" | "medium" | "low">
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(removeUser, (state, action) => {
      state.task.forEach((task) =>
        task.assignedTo === action.payload ? (task.assignedTo = null) : task
      );
    });
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.tasks.filter;

  if (filter === "low") {
    return state.tasks.task.filter((task) => task.priority === "Low");
  } else if (filter === "medium") {
    return state.tasks.task.filter((task) => task.priority === "Medium");
  } else if (filter === "high") {
    return state.tasks.task.filter((task) => task.priority === "High");
  } else {
    return state.tasks.task;
  }
};
export const selectFilter = (state: RootState) => {
  return state.tasks.filter;
};

export const { addTask, toggleCompleteState, deleteTask, filterTask } =
  taskSlice.actions;

export default taskSlice.reducer;
