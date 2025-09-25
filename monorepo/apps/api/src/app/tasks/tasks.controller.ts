import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto } from '@monorepo/data';
import { JwtAuthGuard } from '@monorepo/auth';

@Controller("tasks")
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks() {
        return this.tasksService.findAll();
    }

    @Post()
    createTask(@Body() createTask: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(createTask)
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {

    }
}
