import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto, Status, UpdateTaskDto, UserDto } from '@monorepo/data';
import { JwtAuthGuard, Roles, RolesGuard } from '@monorepo/auth';
import { UserService } from '../users/users.service';
 import { Request } from 'express';

@Controller("tasks")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
    constructor(private tasksService: TasksService, private userService: UserService) {}

    @Get()
    getTasks(@Req() req: Request) {
        console.log(req.user);
        
        return this.tasksService.findAll(req.user as UserDto);
    }

    @Post()
    @Roles("admin", "owner")
    async createTask(@Body() createTask: CreateTaskDto): Promise<Task> {
        const user = await this.userService.getUserByUsername(createTask.assignedToUsername);
        const {title, dueDate, assignedBy, organization, category, priority} = createTask

        if(!title || title.trim() == "") throw new BadRequestException("missing data")

        const task = {
            title: title,
            status: Status.Pending,
            category,
            priority,
            createdAt: new Date(),
            dueDate: dueDate,
            assignedTo: user,
            assignedBy,
            organization
        } as Task

        return this.tasksService.create(task)
    }

    @Put(':id')
    @Roles("admin", "owner")
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        const existingTask = await this.tasksService.findById(id)
        if(!existingTask) throw new BadRequestException("task not found")

        const updatedTask = await this.tasksService.update(id, updateTaskDto)
        console.log("updated");
        console.log(updatedTask);
        
        
        return updateTaskDto
    }

    @Delete(":id")
    @Roles("admin", "owner")
    deleteTask(@Param("id") id: string) {
        return this.tasksService.deleteTask(id)
    }
}
