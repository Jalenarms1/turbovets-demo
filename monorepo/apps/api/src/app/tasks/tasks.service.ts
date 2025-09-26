import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { Roles, TasksDto, UpdateTaskDto, UserDto } from '@monorepo/data';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async deleteTask(id: string) {
    return this.taskRepo.delete(id)
  }

  async findAll(user: UserDto) {
    const whereFilter = {organization: user?.organization} as TasksDto
    console.log(user);
    
    if(user?.role?.name == Roles.Viewer) {
      whereFilter.assignedTo = user
    }

    const tasks = await this.taskRepo.find({
      where: whereFilter,
      relations: ["assignedTo", "assignedBy"]
    });
    return tasks.map(t => {
      return {
        ...t,
        assignedBy: {
          id: t.assignedBy?.id,
          username: t.assignedBy?.username
        },
        assignedTo: {
          id: t.assignedTo?.id,
          username: t.assignedTo?.username
        }
      }
    }) as TasksDto[]
  }

  create(task: Partial<Task>) {
    const newTask = this.taskRepo.create(task);
    return this.taskRepo.save(newTask);
  }

  async findById(id: string) {
    const existingtask = await this.taskRepo.findOneBy({ id })
    
    return existingtask
  }

  async update(id: string, task: UpdateTaskDto) {

    await this.taskRepo.update(id, task);
    return this.taskRepo.findOneBy({ id });
  }
}