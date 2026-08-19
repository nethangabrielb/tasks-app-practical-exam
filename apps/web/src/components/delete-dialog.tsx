import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UseMutationResult } from "@tanstack/react-query";
import { Trash } from "lucide-react";

export const DeleteDialog = ({
  deleteTaskMutation,
  taskId,
}: {
  deleteTaskMutation: UseMutationResult<any, Error, number, unknown>;
  taskId: number;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash
          size="16"
          className="cursor-pointer text-muted-foreground"
        ></Trash>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this task
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteTaskMutation.mutate(taskId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
