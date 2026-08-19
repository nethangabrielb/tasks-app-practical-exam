import { z } from "zod";

export const TaskStatus = z.enum(["INCOMPLETE", "COMPLETED"]);

export const createTaskSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: TaskStatus.default("INCOMPLETE"),
});

const taskSchema = createTaskSchema.extend({
  id: z.number(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type TaskStatus = z.infer<typeof TaskStatus>;
export type Task = z.infer<typeof taskSchema>;
