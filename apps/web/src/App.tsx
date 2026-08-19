import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchTasks } from "@/components/search-tasks";

const App = () => {
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

        {/* search task input */}
        <SearchTasks />
      </div>
    </main>
  );
};

export default App;
