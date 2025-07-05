import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTaskQuery } from "@/redux/api/baseApi";
import type { ITask } from "@/types/task-types";

export default function Task() {
  const { data, isLoading, isError } = useGetTaskQuery(undefined, {
    /**
     * note: The `undefined` argument is used here because the query does not require any parameters.
     * * The `useGetTaskQuery` hook is designed to fetch tasks from the API.
     * * The second argument is an options object that configures the query behavior:
     * * - `pollingInterval`: Sets the interval for polling the API to fetch new data.
     * * - `refetchOnFocus`: Refetches the data when the window is focused.
     * * - `refetchOnMountOrArgChange`: Refetches the data when the component mounts or when the arguments change.
     * * - `refetchOnReconnect`: Refetches the data when the browser reconnects to the network.
     * * This setup ensures that the task list is kept up-to-date with the latest data from the server.
     */
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  console.log({ data, isLoading, isError });

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 mt-20">
      <div className="flex justify-end items-center gap-5">
        <h1 className="mr-auto">Tasks</h1>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="high">High</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="low">Low</TabsTrigger>
          </TabsList>
        </Tabs>
        <AddTaskModal />
      </div>
      <div className="space-y-5 mt-5">
        {!isLoading &&
          data.tasks.map((task: ITask) => (
            <TaskCard task={task} key={task.id} />
          ))}
      </div>
    </div>
  );
}
