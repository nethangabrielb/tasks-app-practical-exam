import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchTasks } from "@/components/search-tasks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Task } from "@repo/validators";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const App = () => {
  const queryClient = useQueryClient();

  // new task state
  const [newTask, setNewTask] = useState({ name: "", description: "" });

  // state for search and filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "INCOMPLETE" | "COMPLETED">(
    "ALL",
  );

  // query for tasks
  const { data, isPending } = useQuery({
    queryKey: ["tasks", filter, search],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filter !== "ALL") {
        params.append("status", filter);
      }

      if (search.trim()) {
        params.append("search", search.trim());
      }

      const queryString = params.toString();
      const url = queryString ? `/api/tasks?${queryString}` : "/api/tasks";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return res.json();
    },
  });

  // mutation for adding new tasks
  const addTaskMutation = useMutation({
    mutationFn: async (newTask: { name: string; description: string }) => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) {
        throw new Error("Failed to add task");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Task added successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const statusStyle = (status: string) => {
    switch (status) {
      case "INCOMPLETE":
        return "text-neutral bg-neutral p-1 rounded-md";
      case "COMPLETED":
        return "text-green-700 bg-green-100 p-1 rounded-md";
    }
  };

  const totalTasks = data?.data?.length || 0;
  const completedTasks =
    data?.data?.filter((task: Task) => task.status === "COMPLETED").length || 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-xl flex-col items-start justify-between text-sm lg:flex gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Tasks</h1>
          <p className="text-muted-foreground">
            {totalTasks} out of {completedTasks} tasks completed
          </p>
        </div>

        {/* add task input */}
        <form
          className="flex w-full items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newTask.name.trim()) {
              toast.error("Task name is required");
              return;
            }
            addTaskMutation.mutate(newTask);
            setNewTask({ name: "", description: "" });
          }}
        >
          <Input
            placeholder="Add a task..."
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <Button type="submit">Add</Button>
        </form>

        {/* search and filter task input */}
        <SearchTasks
          search={search}
          setSearch={setSearch}
          setFilter={setFilter}
        />

        {/* tasks list */}
        <Card className="w-full p-0! gap-0! rounded-md">
          {isPending && (
            <div className="flex items-center justify-center p-4">
              <Spinner />
            </div>
          )}
          {data?.data?.map((task: Task) => (
            <div key={task.id} className="w-full p-2 border-b last:border-b-0">
              <div className="flex items-center gap-4">
                <Checkbox checked={task.status === "COMPLETED"} />
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex gap-2 w-fit">
                    <CardTitle
                      className={cn(
                        "text-md font-semibold w-full",
                        task.status === "COMPLETED" &&
                          "line-through text-muted-foreground",
                      )}
                      title={task.name}
                    >
                      {task.name}
                    </CardTitle>
                    <p className={cn(statusStyle(task.status), "text-xs")}>
                      {task.status === "INCOMPLETE"
                        ? "Incomplete"
                        : "Completed"}
                    </p>
                  </div>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground w-full truncate">
                      {task.description}
                    </p>
                  </CardContent>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </main>
  );
};

export default App;
