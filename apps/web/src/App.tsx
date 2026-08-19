import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchTasks } from "@/components/search-tasks";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@repo/validators";

const App = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetch("/api/tasks").then((res) => res.json()),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-xl flex-col items-start justify-between text-sm lg:flex gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Tasks</h1>
          <p className="text-muted-foreground">3 out of 5 tasks completed</p>
        </div>

        {/* add task input */}
        <form className="flex w-full items-center gap-2">
          <Input placeholder="Add a task..." />
          <Button type="submit">Add</Button>
        </form>

        {/* search and filter task input */}
        <SearchTasks />

        {/* tasks list */}
        <Card className="w-full p-0! gap-0!">
          {data?.data?.map((task: Task) => (
            <div key={task.id} className="w-full p-2 border-b last:border-b-0">
              <CardHeader>
                <CardTitle className="text-md font-semibold">
                  {task.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{task.description}</p>
              </CardContent>
            </div>
          ))}
        </Card>
      </div>
    </main>
  );
};

export default App;
