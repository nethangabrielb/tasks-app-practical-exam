import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Task } from "@repo/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export const EditDialog = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    description: task.description || "",
  });

  // mutation for updating task
  const updateTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: task.name,
          description: task.description,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <SquarePen
          size="16"
          className="cursor-pointer text-muted-foreground"
        ></SquarePen>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Make changes to your task.</DialogDescription>
        </DialogHeader>
        <form
          className="flex w-full items-start flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateTaskMutation.mutate({
              ...task,
              name: editedTask.name,
              description: editedTask.description,
            });
          }}
        >
          <Label htmlFor="name">Title</Label>
          <Input
            defaultValue={task.name}
            id="name"
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
          />
          <Label htmlFor="description">Description</Label>
          <Input
            defaultValue={task.description}
            id="description"
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
          <Button type="submit" className="w-full mt-2">
            Confirm Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
