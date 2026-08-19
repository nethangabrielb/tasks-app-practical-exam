import { z } from "zod";

export const TaskStatus = z.enum(["INCOMPLETE", "COMPLETED"]);

export const createTaskSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: TaskStatus.optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
