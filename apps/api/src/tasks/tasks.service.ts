import { Injectable } from '@nestjs/common';
import type { CreateTaskDto, UpdateTaskDto } from '@repo/validators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.client.task.create({
      data: createTaskDto,
    });
    if (!task) {
      throw new Error('Failed to create task');
    }
    return task;
  }

  async findAll() {
    const tasks = await this.prisma.client.task.findMany();
    if (!tasks) {
      throw new Error('Failed to find tasks');
    }
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.client.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new Error('Failed to find task');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.client.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
    if (!task) {
      throw new Error('Failed to update task');
    }
    return task;
  }

  remove(id: number) {
    return this.prisma.client.task.delete({
      where: {
        id,
      },
    });
  }
}
