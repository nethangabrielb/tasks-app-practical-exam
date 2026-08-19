import { Injectable } from '@nestjs/common';
import type { CreateTaskDto, UpdateTaskDto } from '@repo/validators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.client.task.create({
      data: createTaskDto,
    });
  }

  findAll() {
    return this.prisma.client.task.findMany();
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
