import { Injectable } from '@nestjs/common';
import type { CreateTaskDto, UpdateTaskDto } from '@repo/validators';
import { PrismaService } from '../prisma/prisma.service';
import type { TaskStatus } from '@repo/validators';
import type { Prisma } from '@repo/database';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.client.task.create({
      data: createTaskDto,
    });
  }

  findAll(status?: TaskStatus, search?: string) {
    const where: Prisma.TaskWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.client.task.findMany({
      where,
    });
  }

  findOne(id: number) {
    return this.prisma.client.task.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.client.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prisma.client.task.delete({
      where: {
        id,
      },
    });
  }
}
