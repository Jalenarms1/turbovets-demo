import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepo.find();
  }

  create(task: Partial<Task>) {
    const newTask = this.taskRepo.create(task);
    return this.taskRepo.save(newTask);
  }
}